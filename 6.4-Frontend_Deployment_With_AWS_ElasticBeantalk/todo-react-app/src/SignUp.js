import React from "react";
import {
    Button,
    TextField,
    Link,
    Grid,
    Container,
    Typography,
} from "@material-ui/core";
import { signup, existsByEmail } from "./service/ApiService";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            isEmailValid: true,
            emailErrorMessage: '',
            username: '',
            isUsernameValid: true,
            usernameErrorMessage: ''
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
        const data = new FormData(event.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        signup({ username, email, password }).then(
            (response) => {
                if (response) {
                    // 계정 생성 성공 시 login페이지로 리디렉트
                    window.location.href = "/login";
                }
            }
        );
    }

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    }

    handleChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    }

    validateUsername = () => {
        const regexpUsername = /(?=.*[ㄱ-ㅎ|ㅏ-ㅣ])+/;
        const { username } = this.state;

        if (regexpUsername.test(username)) {
            this.setState({
                isUsernameValid: false,
                usernameErrorMessage: '유효하지 않은 이름입니다.'
            })
            return;
        }

        this.setState({
            isUsernameValid: true,
            usernameErrorMessage: ''
        })
    }

    // email의 유효성 검사
    validateEmail = () => {
        // RFC 5322 표준 이메일 정규표현식
        const regexpEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const { email } = this.state;

        if (email === '') {
            this.setState({
                isEmailValid: false,
                emailErrorMessage: '이메일을 입력해주세요.',
            });

            return;
        }

        if (!regexpEmail.test(email)) {
            this.setState({
                isEmailValid: false,
                emailErrorMessage: '유효하지 않은 이메일 형식입니다.'
            })

            return;
        }

        existsByEmail(email).then(
            response => {
                if (response.error == null) {
                    this.setState({
                        isEmailValid: true,
                        emailErrorMessage: ''
                    })
                } else {
                    this.setState({
                        isEmailValid: false,
                        emailErrorMessage: response.error
                    })
                }
            }
        )
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                계정 생성
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="이름"
                                autoFocus
                                onChange={this.handleChangeUsername}
                                error={!this.state.isUsernameValid}
                                onBlur={this.validateUsername}
                                helperText={this.state.usernameErrorMessage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                name="email"
                                autoComplete="email"
                                onChange={this.handleChangeEmail}
                                error={!this.state.isEmailValid}
                                onBlur={this.validateEmail}
                                helperText={this.state.emailErrorMessage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="패스워드"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                계정 생성
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                이미 계정이 있습니까? 로그인 하세요.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default SignUp;
