/**
 * @jest-environment jsdom
 */
 import {pushToHistory} from '../scripts/router.js'

 describe('pushToHistory test cases:', () => {
    test('settings', () => {
        // verifying if it's at input state (object)
        let settingPage = pushToHistory('settings', 0);
        expect(settingPage.state.page).toBe('settings')

        // testing the length 
        let stackLength = settingPage.length; 
        expect(stackLength).toBe(history.length)
    });

    test('entry', () => {
        // verifying if it's at input state (object)
        let entryPage = pushToHistory('entry', 9);
        expect(entryPage.state.page).toBe('entry9')

        // testing the length 
        let stackLength = entryPage.length; 
        expect(stackLength).toBe(history.length)
    });

    test('default', () => {
        // verifying if it's at input state (object)
        let defaultPage = pushToHistory('', 0);
        expect(defaultPage.state.page).toBe(undefined);

        // testing the length 
        let stackLength = defaultPage.length; 
        expect(stackLength).toBe(history.length)
    })

}); 

// is the length stack and the curernt state object is correct 