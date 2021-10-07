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

@WebServlet("/project/flashcard/cardListRandom2")
public class getRandomServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    FlashCard flashcard = new FlashCard("cards.csv");
    // System.out.println("test");
    if (flashcard != null){
      List<Card> cardList = flashcard.getRandomCards();
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
  } else {
    System.out.println("FlashCard null");
  }
    //System.out.printf("\n\n\n\n\n\ntableをうめるためのjson\n%s\n\n\n\n\n\n",json);
  }
}
