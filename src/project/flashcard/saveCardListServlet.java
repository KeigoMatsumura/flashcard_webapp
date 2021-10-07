package project.flashcard;

import java.io.IOException;

import java.util.Iterator;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet("/project/flashcard/saveCardList")
public class saveCardListServlet extends HttpServlet {

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    //FlashCard flashcard = new FlashCard();
    System.out.println("Lets save the list");
    String requestString = request.getParameter("cardList");
    System.out.println(requestString);
    JSONObject obj = new JSONObject(requestString);
    JSONArray jsonArray = obj.getJSONArray("cards");
    FlashCard flashCard = new FlashCard();
    for (int i = 0; i < jsonArray.length(); i++){
      String question = jsonArray.getJSONObject(i).getString("question");
      String answer = jsonArray.getJSONObject(i).getString("answer");
      System.out.println(question + " : " + answer);
      flashCard.addCard(new Card(question, answer));
    }
    flashCard.dumpCards();
    /*
    List<Card> cardList = flashcard.getAllCards();
    StringBuilder builder = new StringBuilder();
    builder.append("{\"cards\":[");
    for (int i = 0; i < cardList.size(); i++){
      Card card = cardList.get(i);
      builder.append("{\"question\":\"" + card.getQuestion() + "\",");
      builder.append("\"answer\":\"" + card.getAnswer() + "\"}");
      if (i != cardList.size() -1) builder.append(",");
    }
    builder.append("]}");
		String json = builder.toString();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter writer = response.getWriter();
		writer.append(json);
		writer.flush();
    */

  }
}
