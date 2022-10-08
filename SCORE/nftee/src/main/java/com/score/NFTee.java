package com.score;

import score.Address;
import score.Context;
import score.ArrayDB;
import score.BranchDB;
import score.annotation.External;

import scorex.util.ArrayList;

import java.util.List;

public class NFTee {
    private String title;
    private String description;

    public NFTee(String title, String description) {
        this.title = title;
        this.description = description;
    }

    BranchDB<String, ArrayList<Address>> proposals = Context.newBranchDB("proposals", Address.class);

    private boolean avaiableVotes(String vote) {
        return vote.equals("For") || vote.equals("Against") || vote.equals("Abstain");
    }

    @External()
    public void Vote(String proposal) {
        Context.require(!proposals.at(proposal).contains(Context.getCaller()));
        Context.require(avaiableVotes(proposal));
        proposals.at(proposal).add(Context.getCaller());
    }

    @External(readonly = true)
    public int getVoteCount(String proposal) {
        Context.require(avaiableVotes(proposal));
        return proposals.at(proposal).size();
    }

    @External(readonly = true)
    public List<Address> getVoters(String proposal) {
        Context.require(avaiableVotes(proposal));
        return proposals.at(proposal);
    }

}