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
"tea"                 {return 'OBJECT';}
"coffee"              {return 'OBJECT';}
"butter"              {return 'OBJECT';}
"cheese"              {return 'OBJECT';}
"biscuits"            {return 'OBJECT';}
"likes"               {return 'VERB'}
"hates"               {return 'VERB'}
"eats"               {return 'VERB'}
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
 : NAME_PHRASE S VERB_PHRASE S OBJECT_PHRASE END_PHRASE
    {return $$ = createNode('SENTENCE',[$1, $3, $5]);}
 | NAME_PHRASE S ADVERB_PHRASE S VERB_PHRASE S OBJECT_PHRASE END_PHRASE
    {return $$ = createNode('SENTENCE',[$1, $3, $5, $7]);}
 | NAME_PHRASE S VERB_PHRASE S NAME_PHRASE END_PHRASE
    {return $$ = createNode('SENTENCE',[$1, $3, $5]);}
 | NAME_PHRASE S ADVERB_PHRASE S VERB_PHRASE S NAME_PHRASE END_PHRASE
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

OBJECT_PHRASE
: OBJECT
   {$$ = createNode('OBJECT', yytext);}
;

ADVERB_PHRASE
 : ADVERB
   {$$ = createNode('ADVERB', yytext);}
;

SPACE
 : S
    {$$ = createNode('S', yytext);}
 ;
