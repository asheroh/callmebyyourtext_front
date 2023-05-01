import { Box, Modal, TextField, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import {
  BeQuestion,
  Container,
  CreateQuestionBox,
  CreateQuestionText,
  RecommendQuestion,
  TitleBox,
  modalStyle2,
} from '../components/ComponentStyled';
import { useNavigate } from 'react-router-dom';
import PrimaryBtn from '../components/Button/PrimaryBtn';
import { Instance } from 'components/Instance';
import axios from 'axios';
import { getCookie } from 'components/Cookie';
import { DummyData } from 'components/DummyData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { primaryColor, secondaryColor } from 'GlobalStyle';

const CreateQuestion = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('name');
  const userId = localStorage.getItem('id');
  const [question, setQuestion] = useState('');
  // const accessToken = localStorage.getItem('access_token');
  // const refreshToken = getCookie('refresh_token');

  // 모달 관리
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  const goToHome = () => {
    navigate('/');
  };

  // 랜덤 추천 질문
  const randomQuestion = useCallback(() => {
    const dummyData = DummyData;
    const selectedNumber = Math.floor(Math.random() * dummyData.length);
    setQuestion(dummyData[selectedNumber].beQuestion);
  }, []);

  const onChange = (e) => {
    setQuestion(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userName && userId) {
      await Instance.post('http://127.0.0.1:8000/questions', {
        question: question,
      })
        .then((res) => {
          console.log(res);
          navigate(`/questionlist/${userId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('로그인 후 이용해주세요.');
      return;
    }
  };

  return (
    <>
      <Container className="fadeIn">
        <TitleBox onClick={goToHome}></TitleBox>
        {userName ? (
          <CreateQuestionText>{userName}님의 질문 만들기</CreateQuestionText>
        ) : (
          <CreateQuestionText>
            로그인 후 질문을 생성할 수 있어요.
          </CreateQuestionText>
        )}
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            required
            fullWidth
            variant="outlined"
            color="info"
            minRows={5}
            id="question"
            name="question"
            value={question}
            label="질문을 입력해주세요."
            multiline
            onChange={onChange}
            sx={{
              width: '350px',
              marginBottom: 1.5,
            }}
          />
          <CreateQuestionBox>
            <RecommendQuestion onClick={randomQuestion}>
              랜덤 추천 질문
            </RecommendQuestion>
            <BeQuestion onClick={modalOpen}>선물받은 질문</BeQuestion>
          </CreateQuestionBox>
          <br />
          <PrimaryBtn btnName={'등록'} type="submit"></PrimaryBtn>
        </Box>
      </Container>

      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle2}>
          <Typography
            id="modal-modal-description"
            sx={{
              width: '90%',
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'center',
              color: `#fff`,
              cursor: 'pointer',
              borderLeft: '5px solid white',
              borderRight: '5px solid white',
              transition: '0.5s',
              '&:hover': {
                color: `${secondaryColor}`,
              },
            }}
          >
            익명으로부터 선물받은 질문입니다.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default CreateQuestion;
