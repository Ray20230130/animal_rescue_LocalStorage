; (function () {

  let currentPage = 1;
  let itemsPerPage = 5;

  let update_id;
  let delete_id;

  let flag = {
    ntitle: false,
    nhref: false,
    nimg: false,
    ncontent: false,
  }

  let newsNums;

  let mynewsArr = []; // JSON資料傳遞給更新按鈕的空陣列
  let mynewsArrStr; //JSON資料轉成文字放進 localStorage

  // ------------------------------------------------------------

  function getNews() {  // 讀JSON檔案成功函數 - 丟資料進去 LocalStorage 裡面。
    $.ajax({
      method: "GET",
      url: "json/ournews.json",
      dataType: "JSON",
      success: function (data) {
        mynewsArrStr = JSON.stringify(data);
        localStorage.setItem("animalNews", mynewsArrStr);
      },
      error: function () {
        alert("錯誤 - json/ournews.json")
      },
    })

  }

  function showdata() { // 使用 LocalStorage 渲染資料 
    // console.log(data[0]);
    let mynews = JSON.parse(localStorage.getItem("animalNews"));
    // console.log(mynews);
    newsNums = mynews.length;

    if (itemsPerPage > newsNums) {
      itemsPerPage = newsNums;
    }

    let dataStart = (currentPage - 1) * itemsPerPage;
    let dataEnd = currentPage * itemsPerPage;

    if (dataEnd > newsNums) {
      dataEnd = newsNums;
    }

    $("#mytable tbody").empty();
    for (let index = dataStart; index < dataEnd; index++) {
      let changeContent = `${mynews[index].Ncontent.substring(0, 45)}...`;

      let strHTML = `
      <tr>
      <td data-th="圖片">
        <img src="${mynews[index].Nimg}" alt="">
      </td>
      <td data-th="標題">${mynews[index].Ntitle}</td>
      <td data-th="內容">
        ${changeContent}
      </td>
      <td data-th="連結">${mynews[index].Nhref}</td>
      <td data-th="功能">
        <button class="btn btn-update" value="${mynews[index].ID}" type="button" data-bs-toggle="modal"
        data-bs-target="#update_news">修改</button>
        <button class="btn btn-delete" value="${mynews[index].ID}">刪除</button>
      </td>
      </tr>
      `;
      $("#mytable tbody").append(strHTML);

      // ------總頁數控制-------
      $("#total_page").text(Math.floor(newsNums / itemsPerPage) + 1);
      $("#page_number").prop("max", Math.floor(newsNums / itemsPerPage) + 1);

    }
  }

  function updateNews(id) {  // 更新資料的連結
    let mynews = JSON.parse(localStorage.getItem("animalNews"));
    let index
    for (i = 0; i < mynews.length; i++) {
      if (mynews[i].ID == id) {
        index = i;
      }
    }

    // console.log(mynews[index]);
    mynews[index].Ntitle = $("#ntitle").val();
    mynews[index].Nhref = $("#nhref").val();
    mynews[index].Nimg = $("#nimg").val();
    mynews[index].Ncontent = $("#ncontent").val();

    localStorage.setItem("animalNews", JSON.stringify(mynews));
    window.location.reload();
  }


  //~*-------------------------------------------------

  // 監聽每頁行數的 input
  $("#items_per_page").on("change", function () {
    // console.log($("#items_per_page").val());
    itemsPerPage = $("#items_per_page").val();
    showdata();
    // getNewsNum();
  })

  $("#btn_page_number").on("click", function () { //跳轉
    currentPage = $("#page_number").val();
    showdata();
    // getNewsNum();
  })

  $("#first_page").on("click", function () { //第一頁
    currentPage = 1;
    showdata();
  })
  $("#prev_page").on("click", function () { //上一頁
    if (currentPage == 1) {
      return false;
    } else {
      currentPage--;
      showdata();
    }
  })
  $("#next_page").on("click", function () { //下一頁
    if (currentPage == $("#total_page").text()) {
      return false;
    } else {
      currentPage++;
      showdata();
    }
  })
  $("#last_page").on("click", function () { //最末頁
    currentPage = $("#total_page").text();
    showdata();
  })

  //~*監聽 修改的 input 格式 
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

  // 修改的点击事件
  //!讀取總資料的陣列 - 傳遞給裡面的 input
  $(document).on('click', '.btn-update', function () { // 修改的点击事件
    let mynews = JSON.parse(localStorage.getItem("animalNews"));
    update_id = $(this).val();
    let index
    for (i = 0; i < mynews.length; i++) {
      if (mynews[i].ID == update_id) {
        index = i;
      }
    }
    // console.log(mynews[index].Ntitle);
    $("#ntitle").val(mynews[index].Ntitle);
    $("#nhref").val(mynews[index].Nhref);
    $("#nimg").val(mynews[index].Nimg);
    $("#ncontent").val(mynews[index].Ncontent);
  });

  $(document).on('click', '.btn-delete', function () { // 刪除的点击事件
    let mynews = JSON.parse(localStorage.getItem("animalNews"));
    update_id = $(this).val();
    let index
    for (i = 0; i < mynews.length; i++) {
      if (mynews[i].ID == update_id) {
        index = i;
      }
    }
    let result = confirm(`確定刪除${mynews[index].Ntitle}嗎?`);
    if (result) {
      mynews.splice(index, 1);
      localStorage.setItem("animalNews", JSON.stringify(mynews));
      window.location.reload();
    }
  });

  $("#update_submit").on("click", function () {  //修改 Model 的送出按鈕
    updateNews(update_id);
  })

  $("#reloadJSON").on("click",function(){
    localStorage.clear("animalNews");
    getNews();
    setTimeout(function () {
      showdata();
    }, 100)
  })

  //------首頁觸發區----------------
  if (localStorage.getItem("animalNews")) {
    showdata();
  } else {
    getNews();
    setTimeout(function () {
      showdata();
    }, 100)
  }
  // localStorage.clear("animalNews");

})()


