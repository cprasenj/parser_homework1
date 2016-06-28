%{
    var createNode = function createNode(header, child) {
      return {header:header, child:child};
    }
%}

%lex

%%
\s+                   {return 'S';}
"ram"                 {return 'NAME';}
"sita"                {return 'NAME';}
"tea"                 {return 'ACTIONABLE';}
"coffee"              {return 'ACTIONABLE';}
"butter"              {return 'ACTIONABLE';}
"cheese"              {return 'ACTIONABLE';}
"biscuits"            {return 'ACTIONABLE';}
"likes"               {return 'VERB'}
"hates"               {return 'VERB'}
"also"                {return 'ADVERB'}
'.'                   {return 'DOT'}
<<EOF>>               {return 'EOF';}

/lex

%%

PROGRAM
 : SENTENCES S EOF
     {return $$ = createNode('PROGRAM', [$1]);}
 ;

SENTENCES
 : SENTENCE
    {$$ = createNode('SENTENCES', [$1]);}
;

SENTENCE
 : NAME_PHRASE S VERB_PHRASE S ACTIONABLE_PHRASE END_PHRASE
    {return $$ = createNode('SENTENCE',[$1, $3, $5]);}
 | NAME_PHRASE S ADVERB_PHRASE S VERB_PHRASE S ACTIONABLE_PHRASE END_PHRASE
    {return $$ = createNode('SENTENCE',[$1, $3, $5, $7]);}
  ;

END_PHRASE
 : DOT
    {$$ = createNode('DOT', yytext);}
 ;

NAME_PHRASE
 : NAME
    {$$ = createNode('NAME', yytext);}
 ;

END_OF_FILE
 : EOF
    {$$ = createNode('EOF', yytext);}
 ;

VERB_PHRASE
: VERB
   {$$ = createNode('VERB', yytext);}
;

ACTIONABLE_PHRASE
: ACTIONABLE
   {$$ = createNode('ACTIONABLE', yytext);}
| NAME
   {$$ = createNode('ACTIONABLE', yytext);}
;

ADVERB_PHRASE
 : ADVERB
   {$$ = createNode('ADVERB', yytext);}
;

SPACE
 : S
    {$$ = createNode('S', yytext);}
 ;
