import inquirer from 'inquirer';
import colors from 'colors';

const inquirerMenu = async () => {
    const questions = [{
        type: 'list',
        name: 'option',
        message: '¿What would you like to do?',
        choices: [
            {
                value: 1,
                name: `Search location`
            },
            {
                value: 2,
                name: `History`
            },
            {
                value: 0,
                name: `Exit`
            }
        ]
    }];

    console.clear();
    console.log('======================='.green);
    console.log('    Select a option    ');
    console.log('=======================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
};

const pause = async () => {
    const question = [{
        type: 'input',
        name: 'option',
        message: `\n\nPress ${'Enter'.green} to continue\n`,
        choices: []
    }];

    await inquirer.prompt(question);
};

const readInput = async message => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Please enter a value';
            }

            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);

    return desc;
};

const listPlaces = async (places = []) => {
    if (places.length > 0) {
        const choices = places.map((place, index) => {

            const idx = `${++index}.`.green;

            return {
                value: place.id,
                name: `${idx} ${place.place_name}`
            }
        });

        choices.unshift({
            value: 0,
            name: '0.'.green + ' Cancel'
        });

        const questions = [{
            type: 'list',
            name: 'id',
            message: 'Select place',
            choices
        }];

        const { id } = await inquirer.prompt(questions);

        return id;
    } else {
        console.log('No places to show');
        return null;
    }
};

const confirm = async message => {
    const question = [{
        type: 'confirm',
        name: 'response',
        message
    }];

    const { response } = await inquirer.prompt(question);

    return response;
};

const showTasksChecklist = async (tasks = []) => {
    if (tasks.length > 0) {
        const choices = tasks.map((task, index) => {

            const idx = `${++index}.`.green;

            return {
                value: task.id,
                name: `${idx} ${task.description}`,
                checked: (task.completedAt) ? true : false
            }
        });

        // console.log(choices);
        // choices.unshift({
        //     value: '0',
        //     name: '0.'.green + ' Cancel'
        // });

        const questions = [{
            type: 'checkbox',
            name: 'ids',
            message: 'Select the tasks to completed',
            choices
        }];

        const { ids } = await inquirer.prompt(questions);

        return ids;
    } else {
        console.log('There are no tasks to show');
        return null;
    }
};

export {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
    confirm,
    showTasksChecklist
};