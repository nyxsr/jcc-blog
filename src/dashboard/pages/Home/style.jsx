import { motion } from "framer-motion";
import styled from "styled-components";

export const GreetingSection = styled(motion.div)`
    background-color: rgba(44, 196, 164, 1);
    border-radius: 15px;
    padding: 3rem;
    margin: 5rem;
`

export const ArticleSection = styled(motion.div)`
    background-color: #fafafa;
    border-radius: 15px;
    padding: 5rem 8rem;
    margin: 5rem;
    > h2{
        font-size: 3rem;
    }
    > hr{
        margin-bottom: 2rem;
    }
`