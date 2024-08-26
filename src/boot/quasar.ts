import { boot } from 'quasar/wrappers';
import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';

export default boot(({ app }) => {
    app.use(Quasar, {
        plugins: {}, // import Quasar plugins and add them here
    });
});
