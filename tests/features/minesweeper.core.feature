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

Scenario: User reveals mine -> game over
Given the user loads the following data: 
"""
OOO  
XOO  
OOO
"""
When the user reveals cell "[1-0]"
Then cell "[1-0]" should be revealed with mine
And game should be over

Scenario: User reveals cell without bomb
Given the user loads the following data: 
"""
OOO  
OOO  
OXO  
"""
When the user reveals cell "[1-0]"
Then cell "[1-0]" should not be revealed with mine
And game should not be over

Scenario Outline: User reveals a cell with no bomb -> shows number of adjacent mines 
Given the user loads the following data: "<mockData>"
When the user reveals cell "[1-1]"
Then cell "[1-1]" should show the following value: "<adjacentMines>"

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
OOO  
OOO  
OOO  
OOX  
"""
When the user reveals cell "[1-1]"
Then cell "[1-1]" should be empty

Scenario: An empty cell revealed by a neighbour, should reveal adjacent cells
Given the user loads the following data: 
"""
OOO  
OOO  
OOO  
XXX  
"""
When the user reveals cell "[2-2]"
Then the mockData should have the following data:
"""
OOO  
OOO  
232  
XXX  
"""

Scenario: An empty cell revealed by a neighbour, should reveal adjacent cells
Given the user loads the following data: 
"""
OOOOO  
OOOOO  
OOXOO  
"""
When the user reveals cell "[0-1]"
Then the mockData should have the following data:
"""
OOOOO  
O111O  
O1X1O  
"""
#Tagging & untagging behaviour (mined cell, questionable cell, etc)

Scenario: Tagging cell as mined, a mined symbol will appear
Given the user tags the cell "[0-0]"
Then cell "[0-0]" should show the following value: "????"

Scenario: Tagging cell as mined, the left mines counter should decrease by one
Given the left mines counter should be: "10"
When the user tags the cell "[0-0]"
Then the left mines counter should be: "9"

Scenario: Untagging cell as mined, the mined symbol will disappear
Given the user tags the cell "[0-0]"
When the user removes tags cell "[0-0]"
Then cell "[0-0]" should show the following value: ""

Scenario: Untagging cell as mined, the mines left counter should increase by one
Given the user tags the cell "[0-0]" 
Then the left mines counter should be: "9"
When the user removes tags cell "[0-0]"
Then the left mines counter should be: "10"

Scenario: Tagging a questionable mine cell, the questionable symbol will appear
Given the user tags as questionable on "[1-1]"
Then cell "[1-1]" should show the following value: "???"

Scenario: Tagging a questionable mine cell, the mines left counter should not decrease nor increase
Given the left mines counter should be: "10"
When the user tags as questionable on "[1-1]"
And the left mines counter should be: "10"

Scenario: Untagging a questionable mine cell, the questionable symbol will disappear
Given the user tags as questionable on "[1-1]"
When the user removes questionable tag on "[1-1]"
Then cell "[1-1]" should show the following value: ""

Scenario: Untagging a questionable mine cell, the mines left counter should not decrease nor increase
Given the left mines counter should be: "10"
When the user removes tags cell "[1-1]"
And the left mines counter should be: "10"

Scenario: Negative tagged mines left 
Given the user loads the following data: "XO"
When the user tags the cell "[0-1]"
And the user tags the cell "[0-0]"
Then the left mines counter should be: "-1"

#End of tagging scenarios