var index = 0;
var randomList; //jsonを参照するためのindex テスト用
// var jsonData = 
//     [
//         {
//             "question": "Apple",
//             "answer": "りんご"   
//         },
//         {
//             "question": "Japan",
//             "answer": "Tokyo"
//         },
//         {
//             "question": "Nepal",
//             "answer": "Kathmandu"
//         }
//     ];

function loadCards(){
    // var table = document.getElementById("show-list");
    // document.getElementById("show-list").innerHTML = "";
    // var row, numberCell, questionCell, answerCell;
    // 
    document.getElementById("showQuestion").innerHTML = randomList.cards[index].question;
    document.getElementById("showAnswer").innerHTML = randomList.cards[index].answer;
}

function sendRandomCardListRequest(){
var url = "cardListRandom";
xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.onreadystatechange = receiveRandomCardListResponse;
xmlHttpRequest.open("GET", url, true);
xmlHttpRequest.send(null);
}

function receiveRandomCardListResponse(){
    console.log("receiving response");
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
      var response = JSON.parse(xmlHttpRequest.responseText);
      randomList = response;
      console.log(response);
      loadCards();
    //   addRow();
    }
  }

//次へボタンが押されたとき
function nextButtonPushed(){
    console.log("next");
    console.log(randomList.cards.length);
    if(index <= randomList.cards.length){
        index++;
        if(index != randomList.cards.length){ 
            document.getElementById("showQuestion").innerHTML = randomList.cards[index].question;
            document.getElementById("showAnswer").innerHTML = randomList.cards[index].answer;
        }else{
            alert('This card is the end of flashcard.');
            index--;
        }
    }  
}
//前へボタンが押されたとき
function previousButtonPushed(){
    console.log("back");
    console.log(randomList.cards.length);
    if(index > 0){
        index--;
        if(index >= 0){
            document.getElementById("showQuestion").innerHTML = randomList.cards[index].question;
            document.getElementById("showAnswer").innerHTML = randomList.cards[index].answer;
        }
    }
}

window.onload = function(){
    //ページ読み込み時にフラッシュカードの一つ目を読み込む
    // document.getElementById("showQuestion").innerHTML = list.cards[index].question;
    // document.getElementById("showAnswer").innerHTML = list.cards[index].answer;
    sendRandomCardListRequest();
}
window.addEventListener("load", function() {
    var nextButtonElement = document.getElementById("next-button");
    nextButtonElement.addEventListener("click", nextButtonPushed, false);
    var previousButtonElement = document.getElementById("previous-button");
    previousButtonElement.addEventListener("click", previousButtonPushed, false);
}, false);
