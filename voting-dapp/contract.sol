// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string description;
        uint voteCountYes;
        uint voteCountNo;
        bool exists;
    }

    mapping(uint => Proposal) public proposals;
    mapping(uint => mapping(address => bool)) public hasVoted;

    uint public proposalCount;

    event ProposalCreated(uint proposalId, string description);
    event Voted(uint proposalId, address voter, bool support);


    function createProposal(string memory description) external {
        proposalCount++;
        proposals[proposalCount] = Proposal(description, 0, 0, true);
        emit ProposalCreated(proposalCount, description);
    }

    
    function vote(uint proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.exists, "Proposal does not exist");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        hasVoted[proposalId][msg.sender] = true;

        if (support) {
            proposal.voteCountYes++;
        } else {
            proposal.voteCountNo++;
        }

        emit Voted(proposalId, msg.sender, support);
    }

    
    function getResults(uint proposalId) external view returns (
        string memory description,
        uint yesVotes,
        uint noVotes
    ) {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.exists, "Proposal does not exist");
        return (proposal.description, proposal.voteCountYes, proposal.voteCountNo);
    }
}
