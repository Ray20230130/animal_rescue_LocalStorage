
; (function () {

  let flag = {
    ntitle: false,
    nhref: false,
    nimg: false,
    ncontent: false,
  }

  function getDate() {
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let date = now.getDate();
    if (date < 10) {
      date = '0' + date;
    }
    let hours = now.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    let seconds = now.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    // console.log(`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

  }


  function sendData() {

    let originDataArr = JSON.parse(localStorage.getItem("animalNews"));
    // console.log(originDataArr);

    let newdata = {
      ID: `${originDataArr.length + 1}`,
      Ntitle: $("#ntitle").val(),
      Nimg: $("#nimg").val(),
      Ncontent: $("#ncontent").val(),
      Nhref: $("#nhref").val(),
      Created_at: getDate()
    }

    originDataArr.push(newdata);

    localStorage.setItem("animalNews", JSON.stringify(originDataArr));
    window.location.reload();

    alert("資料填寫成功");
    clearEmptyMsg();
  }

  function clearEmptyMsg() {
    $("#ntitle").val("");
    $("#ntitle").removeClass("is-invalid is-valid");
    $("#nhref").val("");
    $("#nhref").removeClass("is-invalid is-valid");
    $("#nimg").val("");
    $("#nimg").removeClass("is-invalid is-valid");
    $("#ncontent").val("");
    $("#ncontent").removeClass("is-invalid is-valid");
  }




  //監聽 input 格式
  $("#ntitle").on("input", function () { //監聽標題
    // console.log($(this).val());
    if ($(this).val().length == 0) {
      $(this).removeClass("is-invalid is-valid");
      flag.ntitle = false;
    } else {
      if ($(this).val().length > 4 && $(this).val().length < 21) {
        $(this).removeClass("is-invalid");
        $(this).addClass("is-valid");
        flag.ntitle = true;

      } else {
        $(this).addClass("is-invalid");
        $(this).removeClass("is-valid");
        flag.ntitle = false;

      }
    }
  })
  $("#nhref").on("input", function () { //監聽連結
    // console.log($(this).val());
    if ($(this).val().length == 0) {
      $(this).removeClass("is-invalid is-valid");
      flag.nhref = false;
    } else {
      if ($(this).val().length > 10 && $(this).val().length < 51) {
        $(this).removeClass("is-invalid");
        $(this).addClass("is-valid");
        flag.nhref = true;
      } else {
        $(this).addClass("is-invalid");
        $(this).removeClass("is-valid");
        flag.nhref = false;
      }
    }
  })
  $("#nimg").on("input", function () { //監聽圖片
    // console.log($(this).val());
    if ($(this).val().length == 0) {
      $(this).removeClass("is-invalid is-valid");
      flag.nimg = false;
    } else {
      if ($(this).val().length > 10 && $(this).val().length < 51) {
        $(this).removeClass("is-invalid");
        $(this).addClass("is-valid");
        flag.nimg = true;
      } else {
        $(this).addClass("is-invalid");
        $(this).removeClass("is-valid");
        flag.nimg = false;
      }
    }
  })
  $("#ncontent").on("input", function () { //監聽內容
    // console.log($(this).val());
    if ($(this).val().length == 0) {
      $(this).removeClass("is-invalid is-valid");
      flag.ncontent = false;
    } else {
      if ($(this).val().length > 19) {
        $(this).removeClass("is-invalid");
        $(this).addClass("is-valid");
        flag.ncontent = true;
      } else {
        $(this).addClass("is-invalid");
        $(this).removeClass("is-valid");
        flag.ncontent = false;
      }
    }
  })


  //兩個按鈕監聽
  $("#btn_delete").on("click", function () {  //清除按鈕
    clearEmptyMsg();
  })

  $("#btn_submit").on("click", function () {
    if (flag.ntitle && flag.nhref && flag.nimg && flag.ncontent) {
      sendData();
    } else {
      alert("資料填寫不全");
    }

  })



})()




