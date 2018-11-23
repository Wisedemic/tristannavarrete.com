import React, { Component, createContext } from 'react';

// Define Theme Types
const availableThemes = ['default', 'dark', 'light', 'info', 'warning', 'danger'];

// Create our context
const Context = createContext();

export const ThemeConsumer = Context.Consumer;
export class ThemeProvider extends Component {

    state = { theme: 'default' };

    /**
     * A function to change the current theme.
     * @param {string} theme - The theme type to change to.
     */
    changeTheme = (theme) => {
        switch (theme) {
            case availableThemes[0]:
                this.setState({ theme: availableThemes[0] });
            case availableThemes[1]:
                this.setState({ theme: availableThemes[1] });
            case availableThemes[2]:
                this.setState({ theme: availableThemes[2] });
            case availableThemes[3]:
                this.setState({ theme: availableThemes[3] });
            case availableThemes[4]:
                this.setState({ theme: availableThemes[4] });
            case availableThemes[5]:
                this.setState({ theme: availableThemes[5] });
            default:
                throw new Error('ThemeProvider changeTheme method called without a proper theme!');
        }
    };

    // Revert to default theme 'default'.
    revertToDefault = () => this.setState({ theme: 'default' });

    // Render
    render() {
        return (
            <Context.Provider value={{
                theme: this.state.theme,
                actions: {
                    changeTheme: this.changeTheme
                }
            }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}