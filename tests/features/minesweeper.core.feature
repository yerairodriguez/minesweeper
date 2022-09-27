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
Each dash means one row below it = ooo-ooo-oox'  

Background: 
Given the user opens the app

Scenario: User reveals a cell without mine nor adjacent mines, the cell is empty
Given the user loads the following data; "OOO-OOO-OOO"
When the user reveals the cell [1-1]
Then the cell is empty

Scenario: User reveals an empty cell -> Should reveal adjacent empty cells
Given user loads the following data; "OOO-OOO-OOO"
When the user reveals the cell [2-2]
#Should I also put that the cells are revealed?
Then all the cells should be revealed

Scenario: An empty cell revealed by a neighbour, should reveal adjacent cells
*********I don't know how to write this scenario*********

Scenario: User reveals mine -> game over
Given the user loads the following data: "OOO-XOO-OOO"
When the user reveals cell [2-1]
And cell [2-1] should have bomb
Then game should be over

Scenario: User reveals cell without bomb
Given the user loads the following data: "OOO-OOO-OXO"
When the user reveals cell [2-1]
And cell [2,1] shouldn't have bomb
Then game should not be over

Scenario Outline: User reveals a cell with no bomb -> shows number of adjacent mines 
Given the user loads the following data: "<mockData>"
When the user reveals cell [2-2]
Then the cell [2-2] should show the following value: "<adjacentMines>"

Examples:
    |   mockData  | adjacentMines |
    | OOO-XOO-OOO |       1       |
    | OOO-XOX-OOO |       2       |
    | OOX-XOX-OOO |       3       |
    | OOX-XOX-XOO |       4       |
    | OXX-XOX-XOO |       5       |
    | OXX-XOX-XXO |       6       |
    | XXX-XOX-XXO |       7       |
    | XXX-XOX-XXX |       8       |

Scenario Outline: User reveals a cell when there are no mines around
Given the user loads the following data: "OOOOO-O111O-O1X1O"
When the user reveals cell [1-2]
And cell [1-1] should be uncovered
And cell [1-3] should be uncovered
And cell [1-4] should be uncovered
And cell [1-5] should be uncovered
And cell [2-1] should be uncovered
And cell [2-5] should be uncovered
And cell [3-1] should be uncovered
And cell [3-5] should be uncovered
