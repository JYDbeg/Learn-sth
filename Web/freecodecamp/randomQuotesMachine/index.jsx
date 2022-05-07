import React from "react";
import * as ReactDOM from 'react-dom';
import { ChakraProvider, IconButton, Button, Link, Box, HStack, Spacer, Heading, Container, extendTheme,Flex, Center } from '@chakra-ui/react';
import { FaTwitter } from "react-icons/fa";
import { VscQuote } from "react-icons/vsc";
import { motion } from "framer-motion";
class ClickButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let href = this.props.twitterShareFunc;
        return (
            <HStack mt ="80px" mb="20px">
                <Link href={href} target={"_blank"}>
                    <IconButton colorScheme='twitter' icon={<FaTwitter />} aria-label='Tweet this quote'
                        size='lg' >
                    </IconButton></Link><Spacer />
                <Button onClick={() => { this.props.parentFunc(); this.props.changeColor() }} bgColor={`rgb(${this.props.bgc[0]},${this.props.bgc[1]},${this.props.bgc[2]})`} color={this.props.txc}  variant='solid' size='md'>New Quote
              </Button>
            </HStack>
        );
    }
}

class QuoteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.twitterShare = this.twitterShare(this);
    }
    handleClick() {
        let idx = parseInt(Math.floor(Math.random() * this.props.length));
        this.setState({ index: idx });

    }
    twitterShare() {
        return 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
            encodeURIComponent('"' + this.props.quotes[this.state.index].quote + '" ' + this.props.quotes[this.state.index].author)
    }
    shouldComponentUpdate(nextState) {
        return nextState.index !== this.state.index;
    }
    render() {
        
        return (
            <Center>
                <Box p={4} mt="15%" w="600px"  bgColor={this.props.bgc} borderRadius="50px" >
                    <Heading fontSize="40px" color={`rgb(${this.props.txc[0]},${this.props.txc[1]},${this.props.txc[2]})`}><VscQuote color={`rgb(${this.props.txc[0]},${this.props.txc[1]},${this.props.txc[2]})`} bgColor={this.props.bgc}/>
                
                    {this.props.quotes[this.state.index].quote}</Heading>
                    <Flex mt="40px" mb="40px"><Spacer /><Heading fontSize="25px" color={`rgb(${this.props.txc[0]},${this.props.txc[1]},${this.props.txc[2]})`}>Author:{this.props.quotes[this.state.index].author}</Heading></Flex>
                    <ClickButton parentFunc={this.handleClick} twitterShareFunc={this.twitterShare} changeColor={this.props.changeColor} txc={this.props.bgc} bgc={this.props.txc} />
                </Box></Center>
        );
    }
}
class ContentsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentDidMount() {
        let url = "https://raw.githubusercontent.com/JYDbeg/Learn-sth/master/Web/freecodecamp/randomQuotesMachine/quotes.json";
        fetch(url).then(res => res.json()).then(res =>
            this.setState({
                isLoaded: true,
                quotes: res.quotes,
                quotesLength: res.quotes.length
      
            })
        )

    }

    render() {

  
        if (this.state.quotes) {
            return (
                <Container w="800px">
                    <QuoteContainer quotes={this.state.quotes} length={this.state.quotesLength} txc={this.props.bgc} bgc={this.props.txc} changeColor={this.props.changeColor}  />
                </Container>
            );
        }
        else {
            return <div>Loading...</div>;
        }

    }
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {bgc:[128,128,0],txc:"white"}
        this.changeColor = this.changeColor.bind(this);
    }
    changeColor() {
        let bgc = [parseInt(Math.floor(Math.random() * 255)), parseInt(Math.floor(Math.random() * 255)), parseInt(Math.floor(Math.random() * 255))];
        let txc = bgc.reduce(function (sum, element) {
            return sum + element;
        }, 0) / 3;
        txc = txc >= 120 ? "black" : "white";
        this.setState({ bgc: bgc, txc: txc });
    }
    render() {
        const theme = extendTheme({
            styles: {
                global: {
                    body: {
                        backgroundColor: `rgb(${this.state.bgc[0]},${this.state.bgc[1]},${this.state.bgc[2]})` ,
                        color:this.state.txc
                    }
                }
            }
        });
        return (
            <ChakraProvider theme={theme}>
                <ContentsContainer changeColor={this.changeColor} bgc={this.state.bgc} txc={this.state.txc} />
                <Container><Center><Heading>by JYL</Heading></Center></Container>
            </ChakraProvider>
            )
    }
}

ReactDOM.render(<App />, document.getElementById("container"));