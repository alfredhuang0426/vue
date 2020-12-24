export default function (time) {
    var date = new Date(time*1000);
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
  }