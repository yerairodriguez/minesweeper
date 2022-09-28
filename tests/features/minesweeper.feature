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

#Validations 

Scenario: Validating the dimensions of the board (8x8)
Then the number of columns in the board should be: "8"
And the number of rows in the board should be: "8"

Scenario: Validating that all the cells must be unrevealed at the beginning of the game
Then cells are all unreveled

Scenario Outline: Validating the default mines left counter value
Given the user loads the following data: "<board>"
Then the left mines counter should be "<value>"

Examples:
| board       | value |
| ooo-***-ooo | 3     |
| ***-***-ooo | 6     |

#Reset game behaviour

Scenario: Reset game, return the board and counters to the initial state
Given la liaria parda primero
When the user resets the game
Then mines left should show the following value: "10" 
And tagging disabled
And timeCounter display should show the following value: ""
And cells are all unreveled

Scenario: Reseting the game with mouse, clicking the reset button
When the user clicks on reset button
Then the game should be reset


#User game over & User wins behaviour

Scenario: User game over, cells will be disabled
Given the user loads the following data: "OX"
When user reveals cell [1-2]
And cell [1-1] should be disabled
And cell [1-2] should be disabled

Scenario: User game over, cells with mine will be revealed
Given the user loads the following data: "OX-XX"
When user reveals cell [1-2]
And cell [1-2] should be revealed
And cell [2-1] should be revealed
And cell [2-2] should be revealed

Scenario: User game over, tagging will not be allowed
Given the user loads the following data: "OX"
When user reveals cell [1-2]
And user tags cell [1-1]
Then tagging should be disabled

Scenario: User wins the game, cells will be disabled
Given the user loads the following data: "OX"
When user reveals cell [1-1]
And cell [1-1] should be disabled
And cell [1-2] should be disabled 

Scenario: User wins the game, cells with mine will not be revealed  
Given the user loads the following data: "OX"
When user reveals cell [1-1]
And cell [1-2] should be unrevealed

Scenario: User wins the game, tagging will not be allowed
Given the user loads the following data: "OX"
When user reveals cell [1-1]
And user tags cell [1-2]
Then tagging should be disabled

Scenario: User trying to reveal a revealed cell
Given the user loads the following data: "1X"
Then cell [1-1] should be disabled
And user tries to reveal cell [1-1]
Then nothing should happen