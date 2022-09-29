Feature: Minesweeper

'Cell [1-1] means row = 1, column = 1 (there is no column and row 0)

Cell without bomb -> O  
Cell with bomb -> X  
Cell revealed -> ,

Cell flagged with suspected bomb = !  
Cell flagged with suspected bomb but unsure about it = ?  
Cell flagged but cell with no mine = /

Cell with one adjacent bomb = 1  
Cell with two adjacent bomb = 2  
Cell with three adjacent bomb = 3  
Cell with four adjacent bomb = 4  
Cell with five adjacent bomb = 5  
Cell with six adjacent bomb = 6  
Cell with seven adjacent bomb = 7  
Cell with eight adjacent bomb = 8

3x3 Example with cell with bomb in the [2-2]  
Each dash means one row below it = OOO-OXO-OOO'

Background: 
Given the user opens the app

@manual
Scenario Outline: User reveals cell, time counter display will start
Then the time display should is empty
When the user reveals cell [1-1]
Then time counter should start

@manual
Scenario Outline: Time counter max number reached
Given the user loads the following timeCounter data: "999"  
When the user tags cell [1-1] 
Then the following value del contador should show: "∞"

@manual
Scenario: Starting game with tag as first move
Given the game has not started
And user tags cell [2-2]
Then cell [2-2] should show the following value: "!"
And timeCounter display should start

@manual
Scenario: Starting game with questionable tag as first move
Given the game has not started
And user tags cell [2-2]
Then cell [2-2] should show the following value: "?"
And timeCounter display should start

@manual
Scenario: User game over, time counter should be stopped
Given the user loads the following data: "OX"
When user reveals cell [1-2]
Then time counter should be stopped

@manual
Scenario: User wins the game, time counter should be stopped
Given the user loads the following data: "OX"
When user reveals cell [1-1]
Then time counter should be stopped