Feature: Minesweeper

'Cell [1-1] means row = 1, column = 1 (there is no column and row 0)

Cell without bomb -> o
Cell with bomb -> x
Cell revealed -> $

Cell with one adjacent bomb = 1
Cell with two adjacent bomb = 2
Cell with three adjacent bomb = 3
Cell with four adjacent bomb = 4
Cell with five adjacent bomb = 5
Cell with six adjacent bomb = 6
Cell with seven adjacent bomb = 7
Cell with eight adjacent bomb = 8

Cell flagged with suspected bomb = !
Cell flagged with suspected bomb but unsure about it = ?

3x3 Example with cell with bomb in the [2-2]
Each dash means one row below it = ooo-ooo-oox'

Background: 
Given the user opens the app

Scenario: Untagged Mines left display
Then the mines left should show the following value: "10"

Scenario: Time counter display
Then the time display should show the following value: ""
When the user reveals cell [1-1]
Then time counter display should show the following value: "0"

Scenario: Initial gamemap
Then the number of columns in the board should be: "8"
And the number of rows should be: "8"
And cells are all unreveled

Scenario: Reset game
When the user uses resets the game
Then mines left should show the following value: "10" 
And time display should show the following value: ""
And cells are all unreveled
    
Scenario: User game over
When game is over
Then cells are disabled
And all cells with mines should be revealed
And timeDisplay is stopped

Scenario: Tagging cell as mined
Given the user loads the following data: "OOO-OOO-OOO"
And "<untaggedMinesLeft>" value is: "10"
When the user tags cell [1-1]
Then cell [1-1] should show the following value: "!"
And "<untaggedMinesLeft>" value should be: 9

Scenario: Tagging a tagged cell
Given "<untaggedMinesLeft>" value is: "10"
When the user tags on [2-2]
Then cell [2-2] should show the following value: "?"
And "<untaggedMinesLeft>" display should be: "10"

Scenario: Negative tagged mines left 
Given the user loads the following data: "!!!-!!!-!!!-!!!"
Then "<untaggedMinesLeft>" display should be: "-2"

Scenario Outline: Number of adjacent mines 
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

Scenario: Incorrect tags when user reveals cell with bomb
Given the user loads the following data: "OOO-!OO-XOX"
And user reveals cell [3-1]
Then game should be over
And cell [2-1] should be marked