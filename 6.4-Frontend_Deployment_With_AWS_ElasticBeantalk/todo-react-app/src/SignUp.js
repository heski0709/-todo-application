import React from "react";
import {
    Button,
    TextField,
    Link,
    Grid,
    Container,
    Typography,
} from "@material-ui/core";
import { signup } from "./service/ApiService";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
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
        signup({ email: email, username: username, password: password }).then(
            (response) => {
                if (response) {
                    // 계정 생성 성공 시 login페이지로 리디렉트
                    window.location.href = "/login";
                }
            }
        );
    }

    handleChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    }

    // username의 유효성 검사
    validateUsername = () => {
        const regexpSpecialSymbol = /[~!@#$%^&*(){}[\]<>.;'"\\-_=+/]+/;
        const regexpUsername = /^(?=.*[A-Za-z])[A-Za-z0-9]{8,}$/;

        if (this.state.username === '') {
            this.setState({
                isUsernameValid: false,
                usernameErrorMessage: '이름을 입력해주세요.',
            });

            return;
        } 

        if (regexpSpecialSymbol.test(this.state.username)) {
            this.setState({
                isUsernameValid: false,
                usernameErrorMessage: '특수문자를 포함할 수 없습니다.'
            })

            return;
        }
        
        if (!regexpUsername.test(this.state.username)) {
            this.setState({
                isUsernameValid: false,
                usernameErrorMessage: '하나 이상의 알파벳이 포함되어야하며 숫자, 알파벳 조합으로 8자리 이상이여야 합니다.'
            })

            return;
        }

        this.setState({
            isUsernameValid: true,
            usernameErrorMessage: ''
        })
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
                                label="유저 이름"
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
