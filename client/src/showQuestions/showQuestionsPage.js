import React,{Component} from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "./showQuestionsPage.css"
import { resolve } from 'url';
import { rejects } from 'assert';

class ShowQuestionsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            showQuestions : false,
            showForm: true,
            defaultCoverageData:"",
            currentQuestion: "",
            radioButtonSelected: false
        }
    }
    componentDidMount(){
        this.getQuestionsFromDatabase().then(response=>{
            this.setState({
                ...this.state,
                defaultCoverageData: response
            }).catch(err=>{
                this.setState({
                    ...this.state,
                    defaultCoverageData: ""
                })
            });
        })
    }
    getQuestionsFromDatabase=()=>{
        return new Promise(async (resolve,reject)=>{
            axios.get("http://localhost:5000/table").then(response=>{
                console.log("response is:",response)
                resolve(response)
            }).catch(err=>{
                console.log("err is:",err)
                reject(err)
            });
        });
    }

    getRadiobutton=()=>{
        return (<Radio color="primary"/>);
    }
    creationQuestionCard(){
        return(
            <div>
                <Card>
                    <CardContent>
                        <Typography>
                            Question
                        </Typography>
                        <Typography>
                            {this.state.currentQuestion}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <FormControl component="fieldset">
                            <RadioGroup row>
                                <FormControlLabel 
                                    value="yes"
                                    control={<Radio color="primary"/>} 
                                    label="Yes"/>
                                <FormControlLabel 
                                    value="no" 
                                    control={<Radio color="primary"/>}
                                    label="No"/>
                            </RadioGroup>
                        </FormControl>
                        {this.state.radioButtonSelected &&(
                            <div>
                                <Button variant="contained" color="primary">
                                    Next
                                </Button>
                            </div>
                        )}
                    </CardActions>
                </Card>
            </div>
        );
    }
    render(){
        return(
            <div>
                {this.creationQuestionCard()}
            </div>)
    }
}

export default ShowQuestionsPage