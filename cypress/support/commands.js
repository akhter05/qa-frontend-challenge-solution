
//this command navigate to the provided URL from command line and update language to English
Cypress.Commands.add('navigateAndChangeLanguage', (baseURLPassed, options = {}) => 
{

	var base_URL_CL = 'https://tajawal.com?ncr=1'
		if(baseURLPassed != null){
			base_URL_CL	= 'https://' + baseURLPassed + '?ncr=1' 
			cy.log('Base URL from CLI is ' + base_URL_CL)
			cy.visit(String(base_URL_CL))
		}   else
		{
			base_URL_CL = 'https://tajawal.com?ncr=1'
				cy.log('Base URL from Cypress.JSON file is being used')
				cy.visit('/')

		}	

	if(base_URL_CL.includes('tajawal'))
	{
		// Assert the URL for tajawal
		cy.url().should('include', 'tajawal')	  
		cy.get('a[data-testid=Header__LanguageSwitch]')
		.then(($seletecdlanguage) => {
			if ($seletecdlanguage.text().includes('العربية')) {
				cy.log('I found website in English Language')
			}
			else
			{
				// Assert the URL for tajawal and update language
				cy.url().should('include', 'tajawal')	
				cy.log('I found website in Arabic Language, updating to English')
				cy.get('a[data-testid=Header__LanguageSwitch]').click({force: true}) 
				cy.wait(1000)   
			}
		})
	}
	else
	{
// Assert the URL for almosafer and update language
		cy.url().should('include', 'almosafer')
		cy.log('I found website in Arabic so updating Language')
		cy.get('button[data-testid=Header__LanguageSwitch]').click({force: true})
		cy.get('a').contains('English').click({force: true})
		cy.wait(2000)
		cy.get('body').then((body) => 
		{ if (body.find('button[aria-label=Close Message]').length > 0) 
		{ 
			cy.get('button[aria-label=Close Message]').should('be.visible').click({force: true})
			cy.wait(1000)  
		}})
		cy.get('a[data-testid=Header__FlightsNavigationTab]').should('be.visible').click({force: true}).should('be.focused')
		cy.wait(1000)  
	}
})

// this command creates a string for from and to flight future dates and
// select from calender
Cypress.Commands.add('selectFromAndToFutureCalenderDates', (datePrefix, options = {}) => 
{
	var fromDate = new Date();
	var toDate = new Date();
	fromDate.setDate(fromDate.getDate() + 10) 
	toDate.setDate(toDate.getDate() + 11) 
	var dd = String(fromDate.getDate()).padStart(2, '0');
	var mm = String(fromDate.getMonth() + 1).padStart(2, '0'); 
	var yyyy = fromDate.getFullYear();
	fromDate =  yyyy + '-' + mm + '-' + dd;
	var finalFromDateElementStr = datePrefix + fromDate;
	dd = String(toDate.getDate()).padStart(2, '0');
	mm = String(toDate.getMonth() + 1).padStart(2, '0'); 
	yyyy = toDate.getFullYear();
	toDate =  yyyy + '-' + mm + '-' + dd;
	var finalToDateElementStr = datePrefix + toDate;
	cy.get('div[data-testid=FlightSearchBox__FromDateButton]').click() 
	cy.get('span[data-testid=' + finalFromDateElementStr + ']').click()
	cy.wait(1000)   
	cy.get('span[data-testid=' + finalToDateElementStr + ']').click()
	cy.wait(1000)      

})

// this command fill in the flight details from fixture and initiate search
// for flight
Cypress.Commands.add('fillAndSearchFlights', (flightdata, options = {}) => 
{

	cy.get('a[data-testid=Header__FlightsNavigationTab]').click({force: true})
	cy.get('div[data-testid=FlightSearchBox__RoundTripButton]').should('be.visible')  
	cy.get('button[data-testid=FlightSearchBox__FareCalendarTooltip]').should('be.visible').click() 
	cy.wait(1000)     
// generate a random integer less than stored number of flight destination
// and flight origin arrays and fetch from fixture
	const random = Math.floor(Math.random() * (4 - 0 + 1)) + 0; 
	cy.get('input[data-testid=FlightSearchBox__FromAirportInput]').click().should('be.visible').and('be.focused')   
	cy.get('input[data-testid=FlightSearchBox__FromAirportInput]').clear()	
	cy.get('input[data-testid=FlightSearchBox__FromAirportInput]').type(flightdata.origin[random] + '{enter}')
	cy.wait(1000)  
	cy.get('input[data-testid=FlightSearchBox__ToAirportInput]').click().should('be.visible').and('be.focused')   
	cy.get('input[data-testid=FlightSearchBox__ToAirportInput]').clear()	
	cy.get('input[data-testid=FlightSearchBox__ToAirportInput]').type(flightdata.destination[random]  + '{enter}')
	cy.wait(1000)  
// below line select random future dates from calender by calling custom
// command
	cy.selectFromAndToFutureCalenderDates("FlightSearchCalendar__")
// Search for flights with entered criteria
	cy.get('button[data-testid=FlightSearchBox__SearchButton]').first().should('be.visible').click()
	cy.wait(1000)   
})