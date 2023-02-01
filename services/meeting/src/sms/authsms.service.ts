import axios from 'axios';

class SMS {
  async getAuth() {
    return new Promise<any>((resolve, reject) => {
      const data = JSON.stringify({
        username: 'dsms',
        password: 'dsms1234',
      });

      const config = {
        method: 'post',
        url: `http://${process.env.SMSURL}/authenticate`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
  async sendsms(phonenumber, auth, title, roomid, userid) {
    return new Promise<any>((resolve, reject) => {
      const data = JSON.stringify([
        {
          account: 'KPI',
          sender: 'KPI Society',
          msg: `ลิงก์รับ QR code สำหรับใช้เช็คอิน ${title} http://emeeting.kpisociety.com:3000/detail/stepthree/${roomid}/${userid}`,
          phone: `${phonenumber}`,
        },
      ]);
      const config = {
        method: 'post',
        url: `http://${process.env.SMSURL}/sends`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
}

module.exports = SMS;
