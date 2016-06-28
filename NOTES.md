
fcx - functional classNames
ccx

- Split style object into individual rules

- Add to used rules object
- Reset method - after full Dom update - reset clears usedRules object
- Clear rules method
- New render

- x number to px
- x Autoprefixer


- tests
- It should not throw
- Return a hashed classname
- Add a rule to cache
- Return an array of rules or string
- It should clear cache
- It should attach the stylesheet
- Should dedupe rulesets
- Should extract common rules
- Common rules should match property value pairs
- Should add px unit
- Should autoprefix
- Should create pseudoclass rules
- Should create media rules

- context rerender
- It should skip existing rules
- It should create new updated rules

- after render clean up

