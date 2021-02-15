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
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
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
            defaultCoverageData:[],
            currentQuestion: "",
            selectedRadioButtonValue: "",
            coverageAmount: 0,
            zeroCoverage: 1000
        }
    }
    componentDidMount(){
        this.getQuestionsFromDatabase().then(response=>{
            console.log("response in component did mount is:",response)
            this.setState({
                ...this.state,
                defaultCoverageData: response,
                currentQuestion: response[0].question
            })
        }).catch(err=>{
                this.setState({
                    ...this.state,
                    defaultCoverageData: ""
            })
        });
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextState.zeroCoverage == 0){
            alert("you aren't eligible for coverage")
            return false
        }else{
            return true
        }
    }
    getQuestionsFromDatabase=()=>{
        return new Promise(async (resolve,reject)=>{
            axios.get("http://localhost:5000/table").then(response=>{
                console.log("response is:",response)
                resolve(response.data.values)
            }).catch(err=>{
                console.log("err is:",err)
                reject(err)
            });
        });
    }

    getRadiobutton=()=>{
        return (<Radio color="primary"/>);
    }

    handleRadioChange = (e) => {
        console.log("event is:",e.target.value)
        this.setState({
            ...this.state,
            selectedRadioButtonValue: e.target.value
        })
    }
    
    onNextBtnClicked = () => {
        for(let i=0;i<this.state.defaultCoverageData.length;i++){
            if(this.state.defaultCoverageData[i].question == this.state.currentQuestion){
                var tempCoverageData = this.state.defaultCoverageData
                var currentQuestionObj = tempCoverageData[i]
                delete tempCoverageData[i]
                tempCoverageData = tempCoverageData.filter(obj=>{
                    return obj!=null;
                });
                console.log("tempcoveragedata is:",tempCoverageData)
                if(this.state.selectedRadioButtonValue == "no"){
                    if(currentQuestionObj.ifNo){
                        let coverageAmount = this.state.coverageAmount + parseInt(currentQuestionObj.ifNo)
                        if(coverageAmount == 0){
                            this.setState({
                                ...this.state,
                                coverageAmount: coverageAmount,
                                defaultCoverageData: tempCoverageData,
                                currentQuestion: tempCoverageData[0].question,
                                selectedRadioButtonValue: "",
                                zeroCoverage: 0
                            })
                        }else{
                            this.setState({
                                ...this.state,
                                coverageAmount: coverageAmount,
                                defaultCoverageData: tempCoverageData,
                                currentQuestion: tempCoverageData[0].question,
                                selectedRadioButtonValue: "",
                                zeroCoverage: 1000
                            });
                        }
                    }else{
                        this.setState({
                            ...this.state,
                            defaultCoverageData: tempCoverageData,
                            currentQuestion: tempCoverageData[0].question,
                            selectedRadioButtonValue: ""
                        });
                    }
                }else{
                    let coverageAmount = this.state.coverageAmount + currentQuestionObj.ifYes
                    if(coverageAmount ==0){
                        this.setState({
                            ...this.state,
                            coverageAmount: coverageAmount,
                            defaultCoverageData: tempCoverageData,
                            currentQuestion: tempCoverageData[0].question,
                            selectedRadioButtonValue: "",
                            zeroCoverage: 0
                        });
                    }else{
                        this.setState({
                            ...this.state,
                            coverageAmount: coverageAmount,
                            defaultCoverageData: tempCoverageData,
                            currentQuestion: tempCoverageData[0].question,
                            selectedRadioButtonValue: "",
                            zeroCoverage: 1000
                        });
                    }
                }
                break;
            }
        }
    }

    creationQuestionCard(){
        return(
            <div>
                <Card className="cardClass">
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
                            <RadioGroup row value={this.state.selectedRadioButtonValue} onChange={this.handleRadioChange}>
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
                    </CardActions>
                    {this.state.selectedRadioButtonValue &&(
                        <div className="nextBtn">
                            <Button variant="contained" onClick={this.onNextBtnClicked} color="primary">
                                Next
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        );
    }
    render(){
        console.log("this.state is:",this.state)
        return(
            <Container maxWidth="md">
                {this.state.defaultCoverageData.length > 0 &&(
                    this.creationQuestionCard()
                )}
                {this.state.defaultCoverageData.length == 0 &&(
                    <CircularProgress />
                )}
                {this.state.zeroCoverage && (
                    <div></div>
                )}
            </Container>)
    }
}

export default ShowQuestionsPage