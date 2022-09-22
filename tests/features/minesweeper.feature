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

Scenario: Initial gamemap
Then the number of columns in the board should be: "8"
And the number of rows should be: "8"
And cells are all unreveled

Scenario: Untagged Mines left display
Then the mines left should show the following value: "10"

Scenario Outline: Time counter display
Then the time display should show the following value: "<timeCounter>"
When the user reveals cell [1-1]
Then time counter display should show the following value: "<display>"

Examples:
| timeDisplay | displayResult |
|             |       0       |
|       1     |       2       |
|      10     |      11       |
|     998     |     999       |

Scenario Outline: Time counter max number reached
Given the time counter should show the following value: "999"
Then the following value should show: "∞"

Scenario: Reset game
When the user uses resets the game
Then mines left should show the following value: "10" 
And time display should show the following value: ""
And cells are all unreveled

#Maybe too much work on my programming cause @When game is over ?    
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

Scenario: Untagging cell as mined
Given the user loads the following data: "!OO-OOO-OOO"
And "<untaggedMinesLeft>" value is: "9"
When the user removes tags cell [1-1]
Then cell [1-1] should show the following value: ""
And "<untaggedMinesLeft>" value should be: "10"

Scenario: Tagging a questionable mine cell
Given "<untaggedMinesLeft>" value is: "10"
When the user tags on [2-2]
Then cell [2-2] should show the following value: "?"
And "<untaggedMinesLeft>" display should be: "10"

Scenario: untagging a questionable mine cell
Given "<untaggedMinesLeft>" value is: "10"
When the user removes tag on [2-2]
Then cell [2-2] should show the following value: ""
And "<untaggedMinesLeft>" display should be: "10"

Scenario: Negative tagged mines left 
Given the user loads the following data: "!!!-!!!-!!!-!!!"
Then "<untaggedMinesLeft>" display should be: "-2"

Scenario: Incorrect tag when user reveals cell with bomb
Given the user loads the following data: "OOO-!OO-XOX"
And user reveals cell [3-1]
Then game should be over
And the mockData should be: "OOO-/OO-XOX"

Scenario: User defuses all mines
Given the user loads the following data: "XXX-!OX-X!X"
And user reveals cell [2-2]
Then we should have the following data:  "!!!-36!-!3!"
And timecounter should be stopped
And cells should be disabled