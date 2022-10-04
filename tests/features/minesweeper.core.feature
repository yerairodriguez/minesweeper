Feature: Minesweeper

'Cell [1-1] means row = 1, column = 1 (there is no column and row 0)

Cell without bomb -> O  
Cell with bomb -> X  
Cell revealed -> ,
Cell covered without tags -> .  

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

#Tagging & untagging behaviour (mined cell, questionable cell, etc)

Scenario: Tagging cell as mined, a mined symbol will appear
When the user tags cell [1-1]
Then cell [1-1] should show the following value: "!"

Scenario: Tagging cell as mined, the left mines counter should decrease by one
Given untaggedMinesLeft value is: "10"
When the user tags cell [1-1]
Then untaggedMinesLeft value should be: "9"

Scenario: Untagging cell as mined, the mined symbol will disappear
Given the user tags as "mined" cell [1-1]
When the user removes tags cell [1-1]
Then cell [1-1] should show the following value: ""

Scenario: Untagging cell as mined, the mines left counter should increase by one
And untaggedMinesLeft value is: "9"
When the user removes tags cell [1-1]
And untaggedMinesLeft value should be: "10"

Scenario: Tagging a questionable mine cell, the questionable symbol will appear
When the user tags as "questionable" on [2-2]
Then cell [2-2] should show the following value: "?"

Scenario: Tagging a questionable mine cell, the mines left counter should not decrease nor increase
Given untaggedMinesLeft value is: "10"
When the user tags as "questionable" on [2-2]
And untaggedMinesLeft display should be: "10"

Scenario: Untagging a questionable mine cell, the questionable symbol will disappear
When the user removes tag on [2-2]
Then cell [2-2] should show the following value: ""

Scenario: Untagging a questionable mine cell, the mines left counter should not decrease nor increase
Given untaggedMinesLeft value is: "10"
When the user removes tag on [2-2]
And untaggedMinesLeft display should be: "10"

Scenario: Negative tagged mines left 
Given the user loads the following data: "*o"
And the user tags as "mined" cell [1-2]
And the mines counter should show the following value: "0"
When the user tags as "mined" cell [1-1]
Then untaggedMinesLeft display should be: "-1"

Scenario: Incorrect tag when user reveals cell with bomb
Given the user loads the following data: "XO"
And the user tags as mined cell [1-2]
And user reveals cell [1-1]
Then game should be over
And cell [1-1] should be marked as incorrect

#End of tagging scenarios
@current
Scenario: User reveals mine -> game over
Given the user loads the following data: 
"""
OOO-
XOO-
OOO
"""
When the user reveals cell [2-1]
And cell [2-1] should have bomb
Then game should be over

Scenario: User reveals cell without bomb
Given the user loads the following data: 
"""
OOO-
OOO-
OXO
"""
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

Scenario: User reveals a cell without mine nor adjacent mines, the cell is empty
Given the user loads the following data:
"""
OOO-
OOO-
OOO-
OOX
"""
When the user reveals the cell [2-2]
Then the cell [2-2] is empty

Scenario: An empty cell revealed by a neighbour, should reveal adjacent cells
Given the user loads the following data: 
"""
OOO-
OOO-
OOO-
XXX
"""
When the user reveals cell [2-2]
Then the mockData should have the following data:
"""
OOO-
OOO-
232
...
"""

Scenario: An empty cell revealed by a neighbour, should reveal adjacent cells
Given the user loads the following data: 
"""
OOOOO-
OOOOO-
OOXOO
"""
When the user reveals cell [1-2]
Then the mockData should have the following data:
"""
OOOOO-
O111O-
O1.1O
"""
