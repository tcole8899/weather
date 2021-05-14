import React from 'react';
import styled from 'styled-components';

const BaseCard = styled.div`
    display: inline-flex;
    width: 300px;
    height: 400px;
    padding: 20px;
    border: grey 1px solid;
    border-radius: 50px;
    margin: 15px;
    white-space: normal;
`;

const CardContainer = styled.div`
    width: 300px;
    height: 400px;
    display: table-column-group;
`;

const CardHeader = styled.h1`
    text-align: center;
    height: fit-content;
    white-space: nowrap;
    font-size: 30px;
    color: white;
`;

const CardBody = styled.div`
    margin: 0 auto;
    color: white;
    width: 300px;
    height: 300px;
    bottom: 25%;
    overflow: hidden;
    white-space: normal;
`;

const TempContainer = styled.div`
    margin: 0 auto;
    position: relative;
    width: fit-content;
    font-size: 75px;
    padding-top: 30px;
`;

const DescriptionContainer = styled.div`
    margin: 0 auto;
    width: fit-content;
`;

interface Props {
    detailedForecast: string,
    isDaytime: boolean,
    name: string,
    number: number,
    shortForecast: string,
    temperature: number,
    temperatureUnit: string,
    windDirection: string,
    windSpeed: string
}

function WeatherCard(props: Props) {
    return (
        <BaseCard>
            <CardContainer>
                <CardHeader>{props.name}</CardHeader>
                <CardBody>
                    <TempContainer>{props.temperature}°</TempContainer>
                    <br></br>
                    <br></br>
                    <DescriptionContainer>
                        <p>{props.shortForecast}</p>
                    </DescriptionContainer>
                </CardBody>
            </CardContainer>
        </BaseCard>
    )
}

export default WeatherCard