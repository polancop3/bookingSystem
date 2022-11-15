package com.example.flightbooking.model;

import lombok.Data;

public @Data class Authentication {
   private String idToken;
   private User user;

   public @Data static class User {
      private String id;
      private String email;
      private String picture;

      public User(String id, String email, String picture) {
         this.id = id;
         this.email = email;
         this.picture = picture;
      }
   }
}
