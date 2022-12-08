const Books = require('./books');
const { program } = require('commander');

program
    .option('-a, --action <string>')
    .option('-i, --id <string>')
    .option('-t, --title <string>')
    .option('-au, --author <string>');

program.parse(process.argv);

const argv = program.opts();

async function bootstrap({ action, id, title, author }) {
    try {
        switch (action) {
            case 'getAll': {
                const books = await Books.getAll();

                console.log(books);
                break;
            }

            case 'getById': {
                const book = await Books.getById(id);

                console.log(book);
                break;
            }

            case 'create': {
                const book = await Books.create(title, author);

                console.log(book);
                break;
            }

            case 'update': {
                const book = await Books.update(title, author, id);

                console.log(book);
                break;
            }

            case 'delete': {
                const book = await Books.deleteBook(id);

                console.log(book);
                break;
            }

            default:
                console.log('Unknown action');
        }
    } catch (error) {
        console.log('Error: ' + error.message);
    }
}

// bootstrap({ action: 'getAll' });
// bootstrap({ action: 'getById', id: 'u9kgwNWGi3uUUwh0b8V49' });
// bootstrap({ action: 'create', title: 'Test Book 1', author: 'Test Author 1' });
// bootstrap({
//     action: 'update',
//     title: 'Test Book 2',
//     author: 'Test Author 2',
//     id: 'b685665c-cd71-486c-accd-76538e5b7bc6',
// });
// bootstrap({ action: 'delete', id: 'dd1f2250-4e4e-4f15-af57-52e531ed0609' });
console.log(process.argv);
bootstrap(argv);
