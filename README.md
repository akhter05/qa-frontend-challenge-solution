# qa-frontend-challenge-solution
Solution for QA Frontend Challenge by 'Syed Kashif Hussain Akhter' <akhter05@gmail.com>

1. Download the project.

2. The base URL in Cypress.JSON file has been set to 'https://tajawal.com?ncr=1'. If no URL is passed from command line then this base URL will be used by test file.

3. To override the base URL in Cypress.JSON file, execute below commands;

To execute test cases on Tajawal website

npx cypress open --env api_server=tajawal.com

Or below command to execute test cases on Almosafer website

npx cypress open --env api_server=ae.almosafer.com

4.'cypress\integration' folder contains two seprate folders; firstscenario and secondscenario. Each folder contains .js file for respective first and second scenario mentioned in challenge.

5. The project has two test scenario .js files, one JSON file in Fixture folder, index.js and commands.js file.