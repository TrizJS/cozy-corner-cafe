# Process Reflection – Customer Reviews Feature

For this exercise, I built a customer reviews section for the Cozy Corner Cafe website. The feature displays existing reviews with dynamic 5-star ratings and allows users to submit their own review with validation and localStorage persistence. Submitted reviews are rendered dynamically and remain after page refresh.

Working in micro-iterations felt slower at first, but it significantly improved clarity and control. Breaking the feature into small steps made debugging easier and reduced the risk of compounding errors. Instead of generating a large block of code all at once, I reviewed and tested each stage individually.

The self-review process consistently caught edge-case issues. For example, during the star rendering step, the AI noted that ratings outside the 1–5 range could break the display logic. During validation, it identified that error messages needed to be cleared between submissions to prevent stacking. I also noticed that without careful handling, localStorage could duplicate entries on reload, which required restructuring the render function.

Compared to CLI workflows, using Claude Web felt more visual and iterative. It was easier to stay focused on small improvements without managing terminal context. However, debugging sometimes required more explicit prompting.

I would use micro-iteration and self-review for interactive UI features, form handling, and state management logic. For simple static styling changes, it may be unnecessary. Overall, this workflow reinforced the importance of disciplined iteration and reviewing AI-generated code critically instead of accepting it at face value.
