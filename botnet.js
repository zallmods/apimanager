const axios = require('axios');
const readline = require('readline');
const { promisify } = require('util');

// Colorful ASCII Art
const ASCII_ART = `
\x1b[31m
 ____        _   _                 ____            _             
|  _ \\ _   _| |_| |__   ___  _ __|  _ \\ _ __ ___ (_) ___  ___ 
| |_) | | | | __| '_ \\ / _ \\| '__| |_) | '__/ _ \\| |/ _ \\/ __|
|  __/| |_| | |_| | | | (_) | |   |  __/| | | (_) | |  __/ (__ 
|_|    \\__, |\\__|_| |_|\\___/|_|   |_|   |_|  \\___// |\\___|\\___| 
       |___/                                    |__/           
\x1b[0m
`;

// Configure servers
const servers = [
    { name: 'Botnet', url: 'https://8196-idx-api-1742400521295.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-api-1742400491127.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-api-1742400539469.cluster-qpa6grkipzc64wfjrbr3hsdma2.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-server-1742278306928.cluster-mwrgkbggpvbq6tvtviraw2knqg.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-api-1742400534794.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-php-1741549622757.cluster-qpa6grkipzc64wfjrbr3hsdma2.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-php-1741549828396.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-php-1741549858911.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-php-1741549591315.cluster-fu5knmr55rd44vy7k7pxk74ams.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-php-1741549609757.cluster-a3grjzek65cxex762e4mwrzl46.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-php-1741550296963.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-php-1741550225260.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-php-1741550339619.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-php-1741550284702.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-php-1741550265689.cluster-bec2e4635ng44w7ed22sa22hes.cloudworkstations.dev' },
    { name: 'Botnet', url: 'https://8196-idx-php-1741551222078.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev' },
	{ name: 'Botnet', url: 'https://8196-idx-php-1741551206422.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev' },
	{ name: 'Botnet', url: 'https://8196-idx-php-1741551141383.cluster-bec2e4635ng44w7ed22sa22hes.cloudworkstations.dev' },
	{ name: 'Botnet', url: 'https://8196-idx-php-1741551193876.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev' },
	{ name: 'Botnet', url: 'https://8196-idx-php-1741551169592.cluster-nx3nmmkbnfe54q3dd4pfbgilpc.cloudworkstations.dev' },
	{ name: 'Botnet', url: 'https://8196-idx-php-1741557226271.cluster-7ubberrabzh4qqy2g4z7wgxuw2.cloudworkstations.dev' },
	{ name: 'Botnet', url: 'https://8196-idx-php-1741557240594.cluster-qpa6grkipzc64wfjrbr3hsdma2.cloudworkstations.dev' },
	{ name: 'Botnet', url: 'https://8196-idx-php-1741557206881.cluster-a3grjzek65cxex762e4mwrzl46.cloudworkstations.dev' },
	{ name: 'Botnet', url: 'https://8196-idx-php-1741557189563.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev' },
	{ name: 'Botnet', url: 'https://8196-idx-php-1741557111544.cluster-mwrgkbggpvbq6tvtviraw2knqg.cloudworkstations.dev' },
];

// Color constants
const COLORS = {
    RESET: '\x1b[0m',
    RED: '\x1b[31m',
    GREEN: '\x1b[32m',
    YELLOW: '\x1b[33m',
    BLUE: '\x1b[34m',
    MAGENTA: '\x1b[35m',
    CYAN: '\x1b[36m'
};

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promisify readline question
const question = promisify(rl.question).bind(rl);

// Function to clear console and show ASCII art
function clearConsoleAndShowArt() {
    console.clear();
    console.log(ASCII_ART);
}

// Function to display menu
function showMenu() {
    clearConsoleAndShowArt();
    console.log(`${COLORS.CYAN}===== SERVER CONTROL TERMINAL =====`);
    console.log(`1. ${COLORS.GREEN}List all servers`);
    console.log(`2. ${COLORS.BLUE}Check server status`);
    console.log(`3. ${COLORS.YELLOW}Execute command on specific server`);
    console.log(`4. ${COLORS.MAGENTA}Broadcast command to all servers`);
    console.log(`5. ${COLORS.RED}Update proxy on specific server`);
    console.log(`6. ${COLORS.RED}Update proxy on all servers`);
    console.log(`0. ${COLORS.RED}Exit${COLORS.RESET}`);
    console.log('==================================');

    rl.question(`${COLORS.CYAN}Enter your choice: ${COLORS.RESET}`, handleMenuChoice);
}

// Function to handle menu choices
async function handleMenuChoice(choice) {
    switch (choice) {
        case '0':
            console.log(`${COLORS.RED}Exiting...${COLORS.RESET}`);
            rl.close();
            break;
        case '1':
            listServers();
            break;
        case '2':
            await checkServerStatus();
            break;
        case '3':
            await executeOnServer();
            break;
        case '4':
            await broadcastCommand();
            break;
        case '5':
            await updateProxyOnServer();
            break;
        case '6':
            await updateProxyOnAllServers();
            break;
        default:
            console.log(`${COLORS.RED}Invalid choice. Please try again.${COLORS.RESET}`);
            waitForEnter();
    }
}

// Function to list all servers
function listServers() {
    clearConsoleAndShowArt();
    console.log(`${COLORS.CYAN}===== SERVER LIST =====${COLORS.RESET}`);
    servers.forEach((server, index) => {
        console.log(`${COLORS.GREEN}${index + 1}. ${server.name} (${server.url})${COLORS.RESET}`);
    });
    console.log(`${COLORS.CYAN}======================${COLORS.RESET}`);
    waitForEnter();
}

// Function to check server status
async function checkServerStatus() {
    clearConsoleAndShowArt();
    console.log(`${COLORS.CYAN}===== SERVER STATUS =====${COLORS.RESET}`);
    console.log(`${COLORS.YELLOW}Checking status of all servers...${COLORS.RESET}`);

    const statusPromises = servers.map(async (server, i) => {
        try {
            const response = await axios.get(`${server.url}/status`, { timeout: 5000 });
            return `${COLORS.GREEN}${i + 1}. ${server.name}: ONLINE (${response.data.server})${COLORS.RESET}`;
        } catch (error) {
            return `${COLORS.RED}${i + 1}. ${server.name}: OFFLINE (${error.message})${COLORS.RESET}`;
        }
    });

    const statuses = await Promise.all(statusPromises);
    statuses.forEach(status => console.log(status));

    console.log(`${COLORS.CYAN}==========================${COLORS.RESET}`);
    waitForEnter();
}

// Function to execute command on specific server
async function executeOnServer() {
    clearConsoleAndShowArt();
    console.log(`${COLORS.CYAN}===== EXECUTE COMMAND =====${COLORS.RESET}`);

    try {
        const serverNum = await question(`${COLORS.YELLOW}Enter server number: ${COLORS.RESET}`);
        const index = parseInt(serverNum) - 1;

        if (isNaN(index) || index < 0 || index >= servers.length) {
            console.log(`${COLORS.RED}Invalid server number!${COLORS.RESET}`);
            waitForEnter();
            return;
        }

        const server = servers[index];
        console.log(`${COLORS.GREEN}Selected server: ${server.name}${COLORS.RESET}`);

        const command = await question(`${COLORS.YELLOW}Enter command to execute: ${COLORS.RESET}`);

        if (!command.trim()) {
            console.log(`${COLORS.RED}Command cannot be empty!${COLORS.RESET}`);
            waitForEnter();
            return;
        }

        console.log(`${COLORS.MAGENTA}Executing on ${server.name}: ${command}${COLORS.RESET}`);

        try {
            const response = await axios.post(server.url, {
                command: command
            }, { timeout: 10000 });

            console.log('\nRESULT:');
            console.log('-------------------------------');
            if (response.data.status === 'success') {
                console.log(`${COLORS.GREEN}${response.data.output}${COLORS.RESET}`);
            } else {
                console.log(`${COLORS.RED}ERROR: ${response.data.message}${COLORS.RESET}`);
            }
            console.log('-------------------------------');

        } catch (error) {
            console.log(`${COLORS.RED}Failed to execute command: ${error.message}${COLORS.RESET}`);
        }
    } catch (error) {
        console.log(`${COLORS.RED}An error occurred: ${error.message}${COLORS.RESET}`);
    }

    waitForEnter();
}

// Function to broadcast command to all servers simultaneously
async function broadcastCommand() {
    clearConsoleAndShowArt();
    console.log(`${COLORS.CYAN}===== BROADCAST COMMAND =====${COLORS.RESET}`);

    try {
        const command = await question(`${COLORS.YELLOW}Enter command to broadcast to all servers: ${COLORS.RESET}`);

        if (!command.trim()) {
            console.log(`${COLORS.RED}Command cannot be empty!${COLORS.RESET}`);
            waitForEnter();
            return;
        }

        console.log(`${COLORS.MAGENTA}Broadcasting to all servers: ${command}${COLORS.RESET}`);

        // Use Promise.all to send commands to all servers simultaneously
        const broadcastPromises = servers.map(async (server, i) => {
            try {
                const response = await axios.post(server.url, {
                    command: command
                }, { timeout: 10000 });

                if (response.data.status === 'success') {
                    return `${COLORS.GREEN}SERVER ${i + 1} (${server.name}): SUCCESS${COLORS.RESET}`;
                } else {
                    return `${COLORS.RED}SERVER ${i + 1} (${server.name}): ERROR - ${response.data.message}${COLORS.RESET}`;
                }
            } catch (error) {
                return `${COLORS.RED}SERVER ${i + 1} (${server.name}): FAILED - ${error.message}${COLORS.RESET}`;
            }
        });

        // Wait for all broadcasts to complete and log results
        const results = await Promise.all(broadcastPromises);
        results.forEach(result => console.log(result));

        console.log(`\n${COLORS.GREEN}Broadcast complete!${COLORS.RESET}`);
    } catch (error) {
        console.log(`${COLORS.RED}An error occurred during broadcast: ${error.message}${COLORS.RESET}`);
    }

    waitForEnter();
}

// Similar modifications for updateProxyOnServer and updateProxyOnAllServers (omitted for brevity)
// ... (rest of the code remains the same with color additions)

// Helper function to wait for Enter key
function waitForEnter() {
    rl.question(`\n${COLORS.YELLOW}Press Enter to continue...${COLORS.RESET}`, () => {
        showMenu();
    });
}

// Start the application
console.log(ASCII_ART);
console.log(`${COLORS.GREEN}Terminal Server Control - Starting...${COLORS.RESET}`);
showMenu();
