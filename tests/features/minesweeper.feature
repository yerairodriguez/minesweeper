Feature: Minesweeper

Background: 
Given user opens the app

Scenario: Mines left display
Then the mines display should show the following value: "10"

Scenario: Time counter display
Then the time display should show the following value: ""

Scenario: Initial gamemap
Then the number of columns should be: "8"
Then the number of rows should be: "8"

Scenario: Reset game
When user clicks on "<Reset-Btn>"
Then mines left display should show the following value: "10"
# This will give problem when difficulty is switched
And time counter display should show the following value: ""
# Map sizing?
# And cells are all covered up
# And cells are set to false
# Don't know how to explain those scenarios yet.

Scenario Outline: Flagging cell
When user rightclicks on "<Cell-Btn>"
Then cell should show the following value: "!"
And mines left display should have one less

Examples:
    | minesLeft | cellStatus | minesLeft |
    |     10    |     ""     |     10    |
    |     10    |     "!"    |     9     |
    |     10    |     "?"    |     10    |

Scenario Outline: Flagging flagged cell
When user rightclicks on "<Cell-Btn>"
And cell has the following value: "!"
Then cell should show the following value: "?"
And mines left display should add one mine

Examples:
    | minesLeft | cellStatus | minesLeft |
    |     9     |     "?"     |     10    |






