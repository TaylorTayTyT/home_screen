import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../src/Styles/SongEntry.css";
import { Checkbox } from '@mui/material';

export default function SongEntry(props) {
    const artNames = props.author.map(item => item.name);
    return (
        <Container className='trackContainer'>
            <Row md={4}>
                <Col className='albumPicContainer'>
                    <img className='albumPic' src={props.imageURL}></img>
                </Col>
                <Col className='songInfoContainer'>
                    <Row>
                        {props.title}
                    </Row>
                    <Row>
                        {artNames.join(", ")}
                    </Row>
                </Col>
                <Col>
                    <audio controls>
                        <source src={props.preview_url} type="audio/mpeg"></source>
                    </audio>
                </Col>
            </Row>

        </Container>
    )
}