import { Typography, Box, Modal } from '@mui/material';
import React, { useContext, useState } from 'react';
import { pointColor, primaryColor, secondaryColor } from 'GlobalStyle';
import Typewriter from 'typewriter-effect';
import PrimaryBtn from 'components/Button/PrimaryBtn';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  CursorText,
  modalStyle,
  Container,
  TitleBox,
} from 'components/ComponentStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons';

const MyPage = () => {
  // 변수 관리
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');
  const userName = localStorage.getItem('name');
  const { setIsLoggedIn } = useContext(AuthContext);
  const goToHome = () => {
    navigate('/');
  };

  // 모달 관리
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  // 모달 인풋 관리
  const goToNewQuestion = () => {
    navigate(`/createquestion/${userId}`);
  };
  const goToQuestionList = () => {
    navigate(`/questionlist/${userId}`);
  };

  // 로그아웃 관리
  const logout = () => {
    if (window.confirm('정말 로그아웃하시겠습니까?')) {
      setIsLoggedIn(false);
      localStorage.clear();
      alert('로그아웃되었습니다.');
      // navigate("/", { replace: true });
      window.location.replace('/');
    } else {
      return;
    }
  };

  return (
    <>
      <Container className="fadeIn">
        <TitleBox onClick={goToHome}></TitleBox>
        <br />
        <Typography
          className="fadeIn"
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '20px',
            fontSize: '14px',
            fontWeight: '600',
            color: `${primaryColor}`,
            padding: '1.3%',
            marginBottom: 5,
            border: `4px solid ${primaryColor}`,
            borderTop: 'none',
            borderBottom: 'none',
          }}
        >
          {userName}님의 페이지
        </Typography>
        <Box
          sx={{
            whiteSpace: 'pre-wrap',
            fontSize: '13px',
            fontWeight: '600',
            textAlign: 'center',
            minWidth: '250px',
            minHeight: '17vh',
            lineHeight: '1.5',
            color: `${pointColor}`,
            marginBottom: 5,
            borderTop: `1px dashed ${pointColor}`,
            borderBottom: `1px dashed ${pointColor}`,
            borderRadius: 3,
            padding: 3,
          }}
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("'꽃 피는 계절, 새로운 시작.\n")
                .pauseFor(1000)
                .typeString('겨울이 추위를 녹이는 시간.\n')
                .pauseFor(500)
                .typeString('산들바람, ')
                .pauseFor(500)
                .typeString('불어오는 중간고사')
                .pauseFor(700)
                .deleteChars(4)
                .typeString('<strong>따스한 봄</strong>.\n\n')
                .pauseFor(1000)
                .typeString("<strong>당신</strong>은 어떤 사람인가요?'")
                .start();
            }}
          />
        </Box>
        <PrimaryBtn btnName={'더 알아보기'} onClick={modalOpen}></PrimaryBtn>
      </Container>
      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Noto Sans KR Black',
              color: `${primaryColor}`,
              borderBottom: `1px solid ${primaryColor}`,
              marginBottom: 3,
              cursor: 'pointer',
              transition: '0.5s',
              '&:hover': {
                color: `${primaryColor}`,
              },
            }}
            onClick={goToNewQuestion}
          >
            <FontAwesomeIcon icon={faPlus} /> 새로운 질문 만들기
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Noto Sans KR Black',
              color: `${primaryColor}`,
              borderBottom: `1px solid ${primaryColor}`,
              marginBottom: 3,
              cursor: 'pointer',
              transition: '0.5s',
              '&:hover': {
                color: `${primaryColor}`,
              },
            }}
            onClick={goToQuestionList}
          >
            <FontAwesomeIcon icon={faList} /> 내 질문 리스트 보기
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: 'Noto Sans KR Black',
              color: `${secondaryColor}`,
              opacity: '75%',
              textAlign: 'right',
              transition: '0.5s',
              '&:hover': {
                color: `${primaryColor}`,
              },
            }}
          >
            <CursorText>
              <span onClick={logout}>로그아웃</span>
            </CursorText>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default MyPage;
