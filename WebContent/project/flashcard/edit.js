var rowPosition = 0;
var list;
// window.addEventListener("load", function() {
//     var addButtonElement = document.getElementById("add_button");
//     addButtonElement.addEventListener("click", addFlashcard, false);
//     var deleteButtonElement = document.getElementById("add_button");
//     deleteButtonElement.addEventListener("click", deleteTableRow, false);
// }, false);

var newCards = new Array();

function loadCards(){
  var table = document.getElementById("show-list");
  document.getElementById("show-list").innerHTML = "";
  var row, numberCell, questionCell, answerCell, actionCell;
  for (var i in list.cards){
    row = table.insertRow(i);
    rowPosition = i;
    console.log(rowPosition);
    displayPosition = parseInt(i) + 1;
    numberCell = row.insertCell(0)
    questionCell = row.insertCell(1);
    answerCell = row.insertCell(2);
    // actionCell = row.insertCell(3);
    numberCell.innerHTML = "<span>" + displayPosition + "</span>";
    questionCell.innerHTML = "<input id=\"" + "question-cell-" + rowPosition + "\"" + "value = \"" + list.cards[i].question + "\""+ ">";
    answerCell.innerHTML = "<input id=\"" + "answer-cell-" + rowPosition + "\"" + "value = \"" + list.cards[i].answer + "\""+ ">";
    // actionCell.innerHTML = "<button class=\"" + "button-style" + "id=\"" + "action-cell-" + rowPosition + "\"" + "value = \"" + "delete"  + "\"" + ">";
    // <button class="button-style" id="delete-button" onclick="deleteRow()"></button>
  }
}

function addRow(){
  var table = document.getElementById("show-list");
  var position = table.rows.length;
  row = table.insertRow(++rowPosition);
  var numberCell = row.insertCell(0)
  var questionCell = row.insertCell(1);
  var answerCell = row.insertCell(2);
  var displayPosition = parseInt(rowPosition) + 1;
  numberCell.innerHTML = "<span>"+ displayPosition + "</span>";;
  questionCell.innerHTML = "<input id=\"" + "question-cell-" + rowPosition + "\">";
  answerCell.innerHTML = "<input id=\"" + "answer-cell-" + rowPosition + "\">";
  questionId = "question-cell-" + rowPosition;
  document.getElementById(questionId).select();
}

function saveCards(){
  var questionId, answerId;
  var request = new Array();
  var question, answer;
  var card;
  var count = 0;
  for (var i=0; i <= rowPosition; i++){
    questionId = "question-cell-" + i;
    answerId = "answer-cell-" + i;
    question = document.getElementById(questionId);
    answer = document.getElementById(answerId);
    if (question != null || answer != null){
      if (question.value != "" && answer.value != ""){
        request.push({"question": question.value, "answer": answer.value});
        list.cards[count++] = {"question": question.value, "answer": answer.value};
      }
    }
  }
  console.log(list.cards);
  saveCardListRequest();

}

function start(){
  sendCardListRequest();
}

function sendCardListRequest(){
  var url = "cardList";
  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receiveCardListResponse; //レスポンスが帰ってきたときにどこにうつるか
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.send(null);　//メッセージなし
}

function receiveCardListResponse() {
  console.log("receiving response");
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
    var response = JSON.parse(xmlHttpRequest.responseText);
    list = response;
    console.log(response);
    loadCards();
    addRow();
  }
}

function saveCardListRequest(){
  console.log(JSON.stringify(list));
  var url = "saveCardList?cardList=" + JSON.stringify(list);
  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = saveCardListResponse;
  xmlHttpRequest.open("POST", url, true);
  xmlHttpRequest.send(null);
  /*$.ajax({
          url: 'saveCardList',
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          success: saveCardListResponse,
          data: JSON.stringify(list)
      });
  */
}

function saveCardListResponse(){
  console.log("Save Response Received");
  loadCards();
  addRow();
}