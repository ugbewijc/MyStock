/**
 * 
 */
import UserController from "../../src/api/admin/controllers/UserController";

describe("User Test", () => {
    const invalidCredential = [
        ["", ""],                  // Empty username and password
        ["", "me"],                // Empty username
        ["me", ""],                // Empty password
        ["me@test.com", ""],       // Empty password
        ["me@test.", "me"],        // Invalid email
        ["me@test", "me"],         // Invalid email
    ];

    const invalidPassword = [
        ["qme@gmaile11.com", "e"],
        ["qme@gmaile3.com", "12"],
        ["qme@gmaile1.com", "m01"],
        ["qme@gmaile2.com", "e1"]
    ];

    const validCredential = [
        ["qme@gmaile11.com", "me"],
        ["qme@gmaile1.com", "me"]  // Valid email and password
    ];

    describe("User Registration", () => {
        // Test for invalid credentials
        it.each(invalidCredential)(
            'Invalid Credentials should throw "Invalid Credentials" Error for username="%s" and password="%s"',
            async (username, password) => {
                await expect(UserController.addUser(username, password))
                    .rejects
                    .toThrowError("Invalid Credentials");  // Ensure the error message matches
            }, 30000
        );

        // Test for valid credentials
        // it.each(validCredential)(
        //     'Valid Credentials should Username, a success message and 201 status code',
        //     async (username, password) => {
        //         await expect(UserController.addUser(username, password))
        //             .rejects
        //             .toBe({ message: "success", data: { username: username}});  // Return success message
        //     }
        // );
        // test('successfully logs in with valid credentials', async () => {
        //     const validCredentials = { username: 'admin', password: 'admin123' };

        //     const result = await UserAuthentication.login(validCredentials.username, validCredentials.password);

        //     expect(result).toEqual({ message: "Login successful", user: { username: 'admin', password: 'admin123' } });
        //   });

    });

    describe("User Authentication", () => {
        // Test for invalid credentials
        it.each(invalidCredential)(
            'Invalid Credentials should return repsonse status code 400 and statusText (Invalid Credentials) for username="%s" and password="%s"',
            async (username, password) => {
                // await expect(UserController.login(username, password))
                //     .rejects
                //     .toThrowError("Invalid Credentials");  // Ensure the error message matches
                const result = await UserController.login(username, password);
                expect(result.status).toBe(0);
                expect(result.message).toBe('Invalid Credentials');

            }
        );
        // Test for invalid password
        it.each(invalidPassword)(
            'Invalid Password should return repsonse status code (400) and statusText (Invalid Credentials) for username="%s" and password="%s"',
            async (username, password) => {
                const result = await UserController.login(username, password);
                expect(result.status).toEqual(0);
                expect(result.message).toEqual('Invalid Credentials');
            }
        );

        // Test for valid credentials
        it.each(validCredential)(
            'Valid Credentials should Username, a success message and 201 status code',
            async (username, password) => {
                const result = await UserController.login(username, password);
                expect(result.status).toEqual(1);
                expect(result.data).not.toEqual({});
            }
        );
    });
});