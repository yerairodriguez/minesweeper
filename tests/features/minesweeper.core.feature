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

Scenario: Game over when the user reveals mine
Given the user loads the following data: "OOO-XOO-OOO"
When the user reveals cell [2-1]
And cell [2-1] should have bomb
Then game should be over

Scenario: User reveals cell without bomb
Given the user loads the following data: "OOO-OOO-OXO"
When the user reveals cell [2-1]
And cell [2,1] shouldn't have bomb
Then game should not be over