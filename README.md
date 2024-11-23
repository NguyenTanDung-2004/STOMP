# STOMP - Streaming Text Oriented Protocol.
*In this article, we will discuss about **How to build an interactive website to send message in realtime.***

# The message flow when it is sent to server.
### Scenario:
Suppose that we have two clients: client1 and client2.
* Client 1 sends message to server.
* We want client 2 to know this message without reload page.
### Idea for this problem
* Client 1 and client 2 will subcribe to 1 topic on server.
* When client 1 send message <=> client 1 will publish 1 event on this topic.
* Client 2 receives this message with out reload page because they subscribed to this topic.

# File which need to read.
* GreetingController.java
* WebSocketConfig.java
* resource/static/app.js (How to connect from frontend)


# Thank you!
*I want to say **Thank to you for visiting my mini project!***
