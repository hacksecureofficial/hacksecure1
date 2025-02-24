'use client';

import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar'; // Ensure path is correct
import Footer from '../../components/Footer'; // Ensure path is correct

// Styled components for the page layout
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures full viewport height */
  background-color: #121212;
  color: white;
  font-family: Arial, sans-serif;
`;

const MainContent = styled.main`
  flex: 1; /* Takes remaining space, pushing footer down */
  padding: 20px;
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
`;

const JobInfo = styled.div`
  margin-bottom: 20px;
`;

const JobTitle = styled.h2`
  font-size: 2rem;
  color: #f0f0f0;
`;

const CompanyName = styled.h3`
  font-size: 1.5rem;
  color: #bbb;
`;

const Description = styled.div`
  margin-bottom: 40px;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ApplyContainer = styled.div`
  margin-top: 30px;
`;

const ApplyButton = styled.a`
  background-color: #ff5722;
  color: white;
  font-size: 1.2rem;
  padding: 12px 30px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e64a19;
  }
`;

const JobDescriptionPage = () => {
  return (
    <PageWrapper>
      {/* Include Navbar */}
      <Navbar />

      {/* Main Content */}
      <MainContent>
        {/* Job Image */}
        <ImageContainer>
          <Image src="/Amazon.png" alt="Job Image" />
        </ImageContainer>

        {/* Job Title and Company */}
        <JobInfo>
          <JobTitle><strong>Software Engineer</strong></JobTitle>
          <CompanyName><strong>Company XYZ</strong></CompanyName>
        </JobInfo>

        {/* Job Description */}
        <Description>
          <p>
            We are looking for a Software Engineer to join our dynamic team. You will work on cutting-edge
            projects that help build scalable applications. Strong problem-solving skills and a deep understanding
            of modern web technologies are essential for this role.
          </p>
          <p>
            Responsibilities include designing, developing, testing, and maintaining complex applications. The role
            requires familiarity with frameworks like React, Node.js, and databases.
          </p>
          <p>
            We offer a collaborative environment with opportunities for growth and innovation. If you're passionate
            about technology and eager to work on impactful projects, we want to hear from you!
          </p>
        </Description>

        {/* Apply Now Button */}
        <ApplyContainer>
          <ApplyButton href="https://your-apply-link.com">
            Apply Now
          </ApplyButton>
        </ApplyContainer>
      </MainContent>

      {/* Include Footer */}
      <Footer />
    </PageWrapper>
  );
};

export default JobDescriptionPage;
