package project.flashcard;

import java.util.*;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

public class FlashCard{
    List<Card> cards;

    public FlashCard(){
      cards = new ArrayList<>();
    }

    public FlashCard(String filename){
      cards = new ArrayList<>();
      readCards(filename);
    }
    public void addCard(Card card){
      cards.add(card);
    }

    public List getAllCards(){
      return cards;
    }

    public List getRandomCards(){
      if (cards.size() < 10) return getAllCards();
      List<Card> randomCards = new ArrayList<>();
      int randomIndex;
      Card randomCard;
      while(randomCards.size() < 10){
        randomIndex = (int) (Math.random() * cards.size());
        randomCard = cards.get(randomIndex);
        if (!randomCards.contains(randomCard)){
          randomCards.add(randomCard);
        }
      }
      return randomCards;
    }

    public void dumpCards(){
	     Path path = Paths.get("cards.csv");
	      try (BufferedWriter writer = Files.newBufferedWriter(path)) {
	         for (Card card : cards) {
		           writer.write(card.toString() + "\n");
	         }
	      } catch (IOException e) {
	          System.out.println(e);
	      }
    }

    public void readCards(String filename){
	    cards.clear();
	    Path path = Paths.get(filename);
	    try (BufferedReader reader = Files.newBufferedReader(path)) {
	       String line;
	       while ((line = reader.readLine()) != null) {
           System.out.println(line);
           String[] data = line.split(",");
           String question = data[0].replace("\"", "");;
           String answer = data[1].replace("\"", "");;
           System.out.println(question + " " + answer);
           cards.add(new Card(question, answer));
		     }
		  }
	    catch (IOException e) {
	       System.out.println(e);
	    }
    }
}
