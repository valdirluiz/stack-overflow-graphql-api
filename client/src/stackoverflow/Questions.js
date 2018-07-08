import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";


const GET_QUESTIONS = gql`
    query questions($tag: String!, $limit: Int!, $score: Int!, $sort: String!) {
      questions(tag: $tag, limit: $limit, score: $score, sort: $sort) {
        question_id
        title
        score
      }
    }
  `;

const Questions = ({ limit, tag, score, sort }) => (
    <Query query={GET_QUESTIONS} variables={{ limit, tag, score, sort }}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            if (data.questions == null) return "Resultado não encontrado"
            return (
                <tbody>
                    {data.questions.map(question => (
                        <tr>
                            <td>{question.question_id}</td>
                            <td>{question.title}</td>
                            <td>{question.score}</td>
                        </tr>
                    ))}
                </tbody>
            );
        }}
    </Query>
);

export default Questions;
 