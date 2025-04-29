// UserNotFoundException.java
package com.PAF.PAF.Assigment.exception;

public class UserNotFoundException extends RuntimeException {
    // Remove one of these duplicate constructors
    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(Long id) {
        super("Could not find user with id: " + id);
    }
}