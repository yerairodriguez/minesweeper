Feature: Minesweeper

Background: 
Given the user opens the app

Scenario: Mines left display
Then the "<minesDisplay>" should show the following value: "10"

Scenario: Time counter display
Then the "<timeDisplay>" should show the following value: ""
When the user clicks on "<Cell>"
Then time counter display should show the following value: "0"

Scenario: Initial gamemap
Then the number of columns should be: "8"
Then the number of rows should be: "8"
Then smiley should be "<Bored-Smiley>" 

Scenario: Reset game
When the user clicks on "<Reset-Btn>"
Then mines left display should show the following value: "10" 
# This will give problem when difficulty is switched, <MinesLeft>?
And time counter display should show the following value: ""
# Map sizing? depends on difficulty
# And cells are all covered up
# And cells are set to false
# Don't know how to explain those scenarios yet.

Scenario Outline: Flagging cell
When the user rightclicks on "<Cell>"
Then cell should show the following value: "!"
And mines left display should have one less

Examples:
    | minesLeft | cellStatus | minesLeft |
    |     10    |     ""     |     10    |
    |     10    |     "!"    |     9     |
    |     10    |     "?"    |     10    |

Scenario Outline: Flagging flagged cell
When cell has the following value: "!"
And the user rightclicks on "<Cell>"
Then cell should show the following value: "?"
And mines left display should add one mine

Examples:
    | minesLeft | cellStatus | minesLeft |
    |     9     |     "?"     |     10    |

Scenario: Explodes mine
When the user clicks on "<Cell>"
And "<Cell>" is "<Cell-With-Bomb>"
Then time
Then smiley should be "<Sad-Smiley>"
Then game is ended

Scenario Outline: Set difficulty
When the user clicks on "<difficulty>"
Then new "<mines>", "<rows>" and "<columns>" are generated

Examples:
    |   difficulty   | mines | rows | columns |
    | "Introduction" |  10   |  8   |    8    |
    | "Intermediate" |  40   |  16  |    16   |
    |    "Expert"    |  99   |  16  |    30   |






