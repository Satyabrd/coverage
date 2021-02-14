import React,{Component} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ShowQuestionsPage from '../showQuestions/showQuestionsPage'
import "./page.css"

class LandingPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            showQuestions : false,
            showForm: true
        }
    }    
    useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
    }));

    onSubmit = () => {
        this.setState({
            ...this.state,
            showQuestions: true,
            showForm: false,
            nameValue: "",
            addressValue: "",
            bithvalue: ""
        })
    }

    onClickBack = () => {
        console.log(this.state)
        this.setState({
            ...this.state,
            showQuestions: false,
            showForm: true
        })
    }

    onNameChanger = (e) => {
        this.setState({
            ...this.state,
            nameValue: e.target.value
        })
    }
    onAddressChanger = (e) => {
        this.setState({
            ...this.state,
            addressValue: e.target.value
        })
    }
    onBirthChanger = (e) => {
        this.setState({
            ...this.state,
            birthValue: e.target.value
        })
    }

    render(){
        //const classes = this.useStyles();
        console.log("this.state is:",this.state)
        return(
            <section>
                {this.state.showForm && !this.state.showQuestions &&
                   (<form autoComplete="off">
                        <div className="landingPageTextfield">
                            <TextField id="filled-basic" value={this.state.nameValue} onChange={this.onNameChanger} label="Name" variant="outlined" />
                        </div>
                        <div className="landingPageTextfield">
                            <TextField id="filled-basic" label="Address"value={this.state.addressValue} onChange={this.onAddressChanger} variant="outlined" />
                        </div>
                        <div className="landingPageTextfield">
                            <TextField id="filled-basic" label="Date of Birth"value={this.state.birthValue} onChange={this.onBirthChanger} variant="outlined" />
                        </div>
                        <div className="landingPageTextfield">
                            <Button onClick={this.onSubmit} variant="contained" color="primary">
                                Submit
                            </Button>
                        </div>
                    </form>)
                }
                {!this.state.showForm && this.state.showQuestions &&
                   (<div>
                        <div>
                        <p>Will implement thiss</p>
                        </div>
                        <div className="landingPageTextfield">
                            <ShowQuestionsPage/>
                            <Button onClick={this.onClickBack} variant="contained" color="primary">
                                Back
                            </Button>
                        </div>
                    </div>)
                }
            </section>
        );
    }
}

export default LandingPage