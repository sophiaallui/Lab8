describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    // NOTE: i have a server problem, and if it's 5500, it has a cache to my previously loaded html, 
    // current working port is 5501 for me, and it loads the correct content (journal entries)
    await page.goto('http://127.0.0.1:5501');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry'); 
    let curUrl = page.url(); 
    expect(curUrl).toBe('http://127.0.0.1:5501/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const updatedheader = await page.$eval('body > header > h1', el => el.textContent); 

    // checkings to see if it's equal to entry 1 
    expect(updatedheader).toBe('Entry 1');

  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */

    const firstJournal =  { 
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    };
    
    const firstEntry = await page.$eval('body > entry-page', el => el.entry); 

    // Checking the entry content from current source
    expect(firstJournal).toEqual(firstEntry);

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’

    const classAttribute = await page.$eval('body', el => el.className); 

    expect(classAttribute).toBe('single-entry')

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('body > header > img'); 
    let curUrl = page.url(); 
    expect(curUrl).toBe('http://127.0.0.1:5501/#settings');

  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const updatedheader = await page.$eval('body > header > h1', el => el.textContent); 

    // checkings to see if it's equal to Settings
    expect(updatedheader).toBe('Settings');

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const classAttribute = await page.$eval('body', el => el.className); 

    expect(classAttribute).toBe('settings')

  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    let backURL = 'http://127.0.0.1:5501/#entry1' 
    await page.goBack(); 
    expect(page.url()).toBe(backURL);

  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, entered home page', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    let backURL = 'http://127.0.0.1:5501/' 
    await page.goBack(); 
    expect(page.url()).toBe(backURL);

  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: On home page, check if header if "Journal Entries', async() => {

    const updatedheader = await page.$eval('body > header > h1', el => el.textContent); 

    // checkings to see if it's equal to Settings
    expect(updatedheader).toBe('Journal Entries');

  });
  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On home page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const classAttribute = await page.$eval('body', el => el.className); 

    expect(classAttribute).toBe('')

  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking second <journal-entry>, new URL should contain /#entry2', async () => {
    // implement test14: Clicking on the first journal entry should update the URL to contain “/#entry2”
    await page.click('journal-entry:nth-child(2)'); 
    let curUrl = page.url(); 
    expect(curUrl).toBe('http://127.0.0.1:5501/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: On second Entry page - verifying current title is current', async () => {
    const updatedheader = await page.$eval('body > header > h1', el => el.textContent); 
    // checkings to see if it's equal to entry 1 
    expect(updatedheader).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: On second Entry page - checking <entry-page> contents', async () => {
    const secondEntry = {
        date: "4/26/2021",
        title: "Run, Forrest! Run!",
        content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
        image: {
          src: "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg",
          alt: "forrest running"
        }
      }; 
      const secondJournal = await page.$eval('body > entry-page', el => el.entry); 

    // Checking the entry content from current source
    expect(secondEntry).toEqual(secondJournal);
  });

  // define and implement test17: Clicking the back button once should bring the user back to the home page
  it('Test17: Clicking the back button, entered home page', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    let backURL = 'http://127.0.0.1:5501/' 
    await page.goBack(); 
    expect(page.url()).toBe(backURL);
  });

  // create your own test 19
    // define and implement test14: Verify the url is correct when clicking on the second entry
    it('Test18: Clicking third <journal-entry>, new URL should contain /#entry3', async () => {
      await page.click('journal-entry:nth-child(3)'); 
      let curUrl = page.url(); 
      expect(curUrl).toBe('http://127.0.0.1:5501/#entry3');
    }); 

  // create your own test 18
  it('Test19: On third Entry page - verifying current title is current', async () => {
    const updatedheader = await page.$eval('body > header > h1', el => el.textContent); 
    // checkings to see if it's equal to entry 1 
    expect(updatedheader).toBe('Entry 3');
  });

  it('Test20: Verify that third entry does not have audio', async() => {
    const thirdAudio = await page.$eval('body > entry-page', el => el.entry.audio); 

    // check to see if third entry does not have audio 
    expect(thirdAudio).toBe(); 
  })
  
});
