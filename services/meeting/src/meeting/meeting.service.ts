import { Injectable } from '@nestjs/common';
import {
  AppError,
  MeetingRepository,
  FileRepository,
  AgendesRepository,
  FoodRepository,
  UserattendeesRepository,
  ContactRepository,
  VotehistoryRepository,
} from '@d-debt/share';
import { Prisma } from '@prisma/client';
import * as fs from 'fs';
import rimraf from 'rimraf';
import { el } from 'date-fns/locale';
import { async } from 'rxjs';

@Injectable()
export class MeetingService {
  constructor(
    private meetingRepo: MeetingRepository,
    private fileRepo: FileRepository,
    private agendesRepo: AgendesRepository,
    private foodRepo: FoodRepository,
    private userattendRepo: UserattendeesRepository,
    private contactRepo: ContactRepository,
    private votehistoryRepo: VotehistoryRepository,
  ) {}

  async findAll() {
    return this.meetingRepo.findAll();
  }

  async findAgendaByid(findAgendaByid: string) {
    return this.agendesRepo.findAgendaByid(findAgendaByid);
  }

  async findByid(roomid: string) {
    return this.meetingRepo.findByid(roomid);
  }

  async create(data: any) {
    const meetingData = {
      detail: data.newDataAgenda.detailMeeting,
      title: data.newDataAgenda.title,
      room: data.newDataAgenda.room,
      floor: data.newDataAgenda.floor,
      building: data.newDataAgenda.building,
      meetingplace: data.newDataAgenda.meetingPlace,
      day: data.newDataAgenda.date,
      starttime: data.newDataAgenda.timeStart,
      endtime: data.newDataAgenda.timeEnd,
      uuid: data.id,
      summarychecklist: false,
      gift: data.dataFood.gift === undefined ? false : true,
    };
    const result = await this.meetingRepo.create(meetingData);
    if (result) {
      data.newDataUser.map(async (x: any) => {
        const resultPosition = await this.contactRepo.findById(x.uuidprofile);
        const dataNew: any = {
          username: x.username,
          uuidprofile: x.uuidprofile,
          idmeeting: data.id,
          checkin: false,
          confirm: false,
          type: '',
          type_user: x.type_user,
          foodstatus: false,
          position: x.uuidposition,
          uuidposition:
            Object.keys(resultPosition[0].uuidposition).length === 0
              ? []
              : resultPosition[0].uuidposition,
        };
        await this.userattendRepo.createMany(dataNew);
      });
      data.dataDetail.agenda.map(async (x: any, i: number) => {
        const step = i + 1;
        const path = `./files_all/file_agenda/${data.id}/${step}/`;
        const dataAgende = {
          uuid: data.id,
          agendes: x.title,
          detailagendes: x.detail,
          step: String(step),
          partfiles: path,
        };
        await this.agendesRepo.create(dataAgende);
      });

      // data.dataDetail.agenda.map(async (x: any, i: number) => {
      //   const step = i + 1;
      //   const path = `./files_all/file_agenda/${data.id}/${step}/`;
      //   const dataDetail = {
      //     idmeeting: data.id,
      //     step: String(step),
      //     idagendess: String(step),
      //     detail: x.detail,
      //     type: null,
      //     filepart: path,
      //   };
      //   // console.log(dataDetail);
      //   await this.detailAgendesRepo.create(dataDetail);
      // });
      if (data.dataFood.fooddetail !== undefined) {
        data.dataFood.fooddetail.map(async (x: any) => {
          const foodData = {
            uuid: data.id,
            typefood: x.typefood,
            namefood: x.namefood,
          };
          await this.foodRepo.create(foodData);
        });
      }
    }
  }

  async uploadfileoverview(
    files: any,
    idmeeting: string,
    namefile: string,
    idfile: number,
  ) {
    const path = `./files_all/file_overviwe/${idmeeting}/`;
    const resultEpm = fs.mkdirSync(path, { recursive: true });
    const step = null;
    const type = 'fileOverviwe';
    fs.createWriteStream(`${path}${idmeeting + idfile}.pdf`).write(
      files[0].buffer,
    );
    files.map((e, i) => {
      return this.fileRepo.create(
        idmeeting,
        namefile,
        path,
        type,
        step,
        `${idmeeting + idfile}.pdf`,
      );
    });
  }

  async uploadfileagendas(
    files: any,
    idmeeting: string,
    namefile: string,
    filenumber: number,
    numberstep: number,
  ) {
    const newStep = Number(numberstep) + 1;
    if (files !== undefined || files !== '' || files !== null) {
      const path = `./files_all/file_agenda/${idmeeting}/${newStep}/`;
      const resultEpm = fs.mkdirSync(path, { recursive: true });
      const type = 'fileAgenda';
      // console.log(path);

      files.map((e) => {
        fs.createWriteStream(`${path}${idmeeting + filenumber}.pdf`).write(
          files[0].buffer,
        );
      });
      files.map((e) => {
        return this.fileRepo.create(
          idmeeting,
          namefile,
          path,
          type,
          String(newStep),
          `${idmeeting + filenumber}.pdf`,
        );
      });
    }
  }

  async updatefileoverview(
    files: any,
    idmeeting: string,
    namefile: string,
    idfile: number,
  ) {
    const path = `./files_all/file_overviwe/${idmeeting}/`;

    const resultEpm = fs.mkdirSync(path, { recursive: true });
    const step = null;
    const type = 'fileOverviwe';

    fs.createWriteStream(`${path}${idmeeting + idfile}.pdf`).write(
      files[0].buffer,
    );
    const resultdeletefile = this.fileRepo.delete(idmeeting, type);
    if (resultdeletefile) {
      files.map((e, i) => {
        return this.fileRepo.create(
          idmeeting,
          namefile,
          path,
          type,
          step,
          `${idmeeting + idfile}.pdf`,
        );
      });
    }
  }

  async updatefileagendas(
    files: any,
    idmeeting: string,
    namefile: string,
    filenumber: number,
    numberstep: number,
  ) {
    const newStep = Number(numberstep) + 1;
    if (files !== undefined || files !== '' || files !== null) {
      const path = `./files_all/file_agenda/${idmeeting}/${newStep}/`;
      const resultEpm = fs.mkdirSync(path, { recursive: true });
      const type = 'fileAgenda';
      files.map((e) => {
        fs.createWriteStream(`${path}${idmeeting + filenumber}.pdf`).write(
          files[0].buffer,
        );
      });
      files.map((e) => {
        return this.fileRepo.create(
          idmeeting,
          namefile,
          path,
          type,
          String(newStep),
          `${idmeeting + filenumber}.pdf`,
        );
      });
    }
  }

  async getFilePdf(idmeeting: string, namefile) {
    return this.fileRepo.getFileByid(idmeeting, namefile);
  }
  async getfilestep(idmeeting: string, step: any, namefile: any) {
    return this.fileRepo.getfilestep(idmeeting, step, namefile);
  }
  async getPathFilePdf(idmeeting: string) {
    return this.fileRepo.getPathFilePdf(idmeeting);
  }
  // async createAgendes(data: any, id: string, step: string) {
  //   const path = `./files_all/file_agenda/${id}/${step}/`;
  //   const dataAgende = {
  //     uuid: id,
  //     agendes: data.agendas,
  //     detailagendes: data.detail,
  //     step: String(step),
  //   };
  //   await this.agendesRepo.create(dataAgende);
  //   data.detailAgendes.map(async (e, i) => {
  //     const data = {
  //       idmeeting: id,
  //       step: String(step),
  //       idagendess: String(i),
  //       detail: e.detail,
  //       type: null,
  //       filepart: path,
  //     };
  //     await this.detailAgendesRepo.create(data);
  //   });
  // }

  async deleteFileagenda(roomid: any, step: any, namefile: any) {
    const path = `./files_all/file_agenda/${roomid}/${step}/${namefile}`;
    const type = `fileAgenda`;
    const result = await this.fileRepo.delete(roomid, step, namefile, type);
    if (result) {
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File was successfully removed!');
      });
    }
  }
  async findagendesdetailbyid(roomid, step) {
    return this.agendesRepo.findAgendaStep(roomid, step);
  }
  async findFoodFetail(roomid: any) {
    return this.foodRepo.findByid(roomid);
  }
  async savesummarymeeting(roomid: string, data: any) {
    return this.meetingRepo.updateSummary(roomid, data);
  }
  async savesummarymeetingFile(roomid: string, files: any) {
    const path = `./files_all/file_summarymeeting/${roomid}/`;
    const type = 'filesummary';
    const step = null;
    const resultEpm = fs.mkdirSync(path, { recursive: true });
    files.map((e) => {
      fs.createWriteStream(`${path}/${e.originalname}`).write(e.buffer);
    });
    files.map((e) => {
      return this.fileRepo.create(roomid, e.originalname, path, type, step);
    });
  }
  async updatemeeting(idmeeting, dataAgenda, user, dataDetail, dataFood) {
    const dataMeeting = {
      detail: dataAgenda?.detailMeeting,
      title: dataAgenda.title,
      room: dataAgenda.room,
      floor: dataAgenda.floor,
      building: dataAgenda.building,
      meetingplace: dataAgenda.meetingPlace,
      day: dataAgenda.date,
      starttime: dataAgenda.timeStart,
      endtime: dataAgenda.timeEnd,
      summarymeeting: '',
      summarychecklist: false,
      gift: dataFood.gift,
    };
    const resultUpdatemeeting = await this.meetingRepo.update(
      idmeeting,
      dataMeeting,
    );

    const resultUpdateuser = await this.userattendRepo
      .delete(idmeeting)
      .then(async (data) => {
        user.map(async (x: any) => {
          const resultPosition = await this.contactRepo.findById(x.uuidprofile);
          const dataNew: any = {
            username: x.username,
            uuidprofile: x.uuidprofile,
            idmeeting: idmeeting,
            checkin: false,
            confirm: false,
            type: '',
            type_user: x.type_user,
            foodstatus: false,
            position: x.uuidposition,
            uuidposition:
              Object.keys(resultPosition[0].uuidposition).length === 0
                ? []
                : resultPosition[0].uuidposition,
          };
          await this.userattendRepo.createMany(dataNew);
        });
      });
    const resultUpdateagendas = await this.agendesRepo
      .delete(idmeeting)
      .then(async (data) => {
        await dataDetail['agenda'].map(async (x: any, i: number) => {
          const step = i + 1;
          const path = `./files_all/file_agenda/${idmeeting}/${step}/`;
          const dataAgende = {
            uuid: idmeeting,
            agendes: x.title,
            detailagendes: x.detail,
            step: String(step),
            partfiles: path,
          };
          await this.agendesRepo.create(dataAgende);
        });
      });
    const resultUpdatefood = await this.foodRepo
      .delete(idmeeting)
      .then(async (data) => {
        dataFood['fooddetail']?.map(async (x: any) => {
          const data = {
            uuid: idmeeting,
            typefood: x.typefood,
            namefood: x.namefood,
          };
          await this.foodRepo.create(data);
        });
      });
  }
  async updatefileoverviwe(roomid: string, files: any) {
    const path = `./files_all/file_overviwe/${roomid}/`;
    const resultEpm = fs.mkdirSync(path, { recursive: true });
    const step = null;
    const type = 'fileOverviwe';
    files.map((e) => {
      fs.createWriteStream(`${path}/${e.originalname}`).write(e.buffer);
    });
    // insert data path file
    files.map((e) => {
      return this.fileRepo.create(roomid, e.originalname, path, type, step);
    });
  }
  async getFileoverview(roomid: string) {
    return this.fileRepo.getFileoverview(roomid);
  }
  async getFileagenda(roomid: string) {
    return this.fileRepo.getFileagendas(roomid);
  }
  async updateoldFileoverview(data: any) {
    if (Object.keys(data).length !== 0) {
      const result = await this.fileRepo.getFileoverview(data[0].idroom);
      // data.map(async (data: any) => {
      const dataold = [];
      const datanew = [];
      data.map((x: any) => {
        if (x.type === 'oldfile') {
          dataold.push({
            idfile: x.idfile,
            idroom: x.idroom,
            type: x.type,
          });
        } else if (x.type === 'newfile') {
          datanew.push({
            idfile: x.idfile,
            idroom: x.idroom,
            type: x.type,
          });
        }
      });

      const resultdelete = await result.filter(
        (item) =>
          !dataold.some(
            (itemToBeRemoved) => itemToBeRemoved.idfile === item.idfile,
          ),
      );
      if (Object.keys(resultdelete).length === 0) {
        return;
      } else {
        resultdelete.map(async (x: any) => {
          const filepath = `${x.pathfile}${x.idfile}`;
          fs.unlink(filepath, (err) => {
            if (err) throw err;
            console.log(`deleted ${filepath}`);
          });
          await this.fileRepo.deleteFileByid(x.idmeeting, x.idfile);
        });
      }
    }
  }
  async updateoldFileagenda(data: any) {
    if (Object.keys(data).length !== 0) {
      const result = await this.fileRepo.getFileagendas(data[0].idroom);

      // data.map(async (data: any) => {
      const dataold = [];
      const datanew = [];
      data.map((x: any) => {
        if (x.type === 'oldfile') {
          dataold.push({
            idfile: x.idfile,
            idroom: x.idroom,
            step: x.step,
            type: x.type,
          });
        } else if (x.type === 'newfile') {
          datanew.push({
            idfile: x.idfile,
            idroom: x.idroom,
            step: x.step,
            type: x.type,
          });
        }
      });
      const resultdelete = await result.filter(
        (item) =>
          !dataold.some(
            (itemToBeRemoved) => itemToBeRemoved.idfile === item.idfile,
          ),
      );
      // console.log(resultdelete);
      if (Object.keys(resultdelete).length === 0) {
        return;
      } else {
        resultdelete.map(async (x: any) => {
          const filepath = `${x.pathfile}${x.idfile}`;
          console.log(x.idmeeting, x.idfile);

          fs.unlink(filepath, (err) => {
            if (err) throw err;
            console.log(`deleted ${filepath}`);
          });
          await this.fileRepo.deleteFileAgendesByid(x.idmeeting, x.idfile);
        });
      }
    }
  }
  async deletefileoverviewAll(idroom: string) {
    const result = await this.fileRepo.getFileoverview(idroom);
    result.map(async (x: any) => {
      const filepath = `${x.pathfile}${x.idfile}`;
      fs.unlink(filepath, (err) => {
        if (err) throw err;
        console.log(`deleted ${filepath}`);
      });
    });
    await this.fileRepo.deleteoverviwe(idroom);
  }
  async deletefileagendesAll(idroom: string, number: number) {
    const newstep = Number(number) + Number(1);
    const result = await this.fileRepo.getFileagendas(idroom, String(newstep));
    // console.log(result);

    result.map(async (x: any) => {
      const filepath = `${x.pathfile}${x.idfile}`;
      fs.unlink(filepath, (err) => {
        if (err) throw err;
        console.log(`deleted ${filepath}`);
      });
    });
    await this.fileRepo.deleteagendes(idroom, String(newstep));
  }
  async vote(roomid, type, userid, step) {
    const resultagree = await this.agendesRepo.findAgendaStep(roomid, step);
    const resultUseratd = await this.votehistoryRepo.findbyid(roomid, userid);
    // console.log(resultUseratd);

    if (Object.keys(resultUseratd).length === 0) {
      let sumvote;
      if (type === 'agree') {
        sumvote = Number(resultagree[0].votingagree) + 1;
      } else if (type === 'disagree') {
        sumvote = Number(resultagree[0].votingdisagree) + 1;
      } else {
        sumvote = Number(resultagree[0].votingdisagree) + 1;
      }
      const data = {
        roomid: roomid,
        userid: userid,
        agendesstep: step,
      };
      await this.votehistoryRepo.create(data);
      const updateagendesvote = await this.agendesRepo.updatevote(
        roomid,
        step,
        String(sumvote),
        type,
      );
      return '1';
    } else {
      return '0';
    }
  }
}
