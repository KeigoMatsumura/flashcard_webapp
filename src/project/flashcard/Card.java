package project.flashcard;
public class Card{
  String question;
  String answer;
  public Card(String question, String answer){
    this.question = question;
    this.answer = answer;
  }
  public String getQuestion(){
      return question;
  }

  public void setQuestion(String question){
    this.question = question;
  }

  public String getAnswer(){
    return answer;
  }

  public void setAnswer(String answer){
    this.answer = answer;
  }

  public String toString(){
    return String.format("%s,%s", question, answer);
  }
}
