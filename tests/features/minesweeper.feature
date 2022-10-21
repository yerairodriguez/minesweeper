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

Scenario: Validating the dimensions of the board
Then the number of rows in the board should be: "8"
And the number of cells in the board should be: "64"

Scenario: Validating that all the cells must be unrevealed at the beginning of the game
Then cells are all unreveled


Scenario Outline: Validating the default mines left counter value
Given the user loads the following data: "<board>"
Then the left mines counter should be: "<value>"

Examples:
| board       | value |
| OOO-XXX-OOO | 3     |
| XXX-XXX-OOO | 6     |

#Reset game behaviour

Scenario: Reset game, return the board and counters to the initial state
Given the user reveals cell "[0-0]"
And the user tags the cell "[0-1]"
When the user resets the game
Then the left mines counter should be: "10" 
And timeCounter display should show the following value: "00:00"
And cells are all unreveled

#User game over & User wins behaviour

Scenario: User game over, cells with mine will be revealed
Given the user loads the following data: "OX-XX"
When the user reveals cell "[0-1]"
Then cell "[0-1]" should be revealed with mine
And cell "[1-0]" should be revealed with mine
And cell "[1-1]" should be revealed with mine

@current
Scenario: User wins the game, cells with mine will not be revealed  
Given the user loads the following data: "OX"
When the user reveals cell "[0-0]"
And cell "[0-1]" should be unrevealed